import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SubmitOptions {
  email: string;
  source: string;
  name?: string;
  message?: string;
}

export function useEmailSubmit() {
  const [loading, setLoading] = useState(false);

  const submit = async ({ email, source, name, message }: SubmitOptions) => {
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return false;
    }

    setLoading(true);
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from("email_submissions")
        .insert({ email, source });

      if (dbError) throw dbError;

      // Send email via edge function
      const { error: fnError } = await supabase.functions.invoke("send-email", {
        body: { email, source, name, message },
      });

      if (fnError) throw fnError;

      toast({ title: source === "contact" ? "Message sent!" : "You're on the list! 🎉", description: "Check your inbox for a confirmation." });
      return true;
    } catch (err: any) {
      console.error("Submit error:", err);
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
}
