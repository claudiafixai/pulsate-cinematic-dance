export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      dancers: {
        Row: {
          age_group: string | null
          created_at: string | null
          dance_style: string | null
          email: string
          group_size: number | null
          group_type: string | null
          id: string
          internal_notes: string | null
          level: string | null
          name: string
          payment_status: string | null
          phone: string | null
          status: string | null
          video_url: string | null
          vip_pass: boolean | null
          waiver_signed: boolean | null
          workshop_pass: boolean | null
        }
        Insert: {
          age_group?: string | null
          created_at?: string | null
          dance_style?: string | null
          email: string
          group_size?: number | null
          group_type?: string | null
          id?: string
          internal_notes?: string | null
          level?: string | null
          name: string
          payment_status?: string | null
          phone?: string | null
          status?: string | null
          video_url?: string | null
          vip_pass?: boolean | null
          waiver_signed?: boolean | null
          workshop_pass?: boolean | null
        }
        Update: {
          age_group?: string | null
          created_at?: string | null
          dance_style?: string | null
          email?: string
          group_size?: number | null
          group_type?: string | null
          id?: string
          internal_notes?: string | null
          level?: string | null
          name?: string
          payment_status?: string | null
          phone?: string | null
          status?: string | null
          video_url?: string | null
          vip_pass?: boolean | null
          waiver_signed?: boolean | null
          workshop_pass?: boolean | null
        }
        Relationships: []
      }
      email_log: {
        Row: {
          email_type: string
          id: string
          recipient_email: string
          recipient_type: string | null
          resend_id: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          email_type: string
          id?: string
          recipient_email: string
          recipient_type?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          email_type?: string
          id?: string
          recipient_email?: string
          recipient_type?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      email_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string
        }
        Relationships: []
      }
      judges: {
        Row: {
          bio: string | null
          contract_signed: boolean | null
          created_at: string | null
          email: string
          id: string
          internal_notes: string | null
          name: string
          role: string | null
          specialty: string | null
          status: string | null
        }
        Insert: {
          bio?: string | null
          contract_signed?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          internal_notes?: string | null
          name: string
          role?: string | null
          specialty?: string | null
          status?: string | null
        }
        Update: {
          bio?: string | null
          contract_signed?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          internal_notes?: string | null
          name?: string
          role?: string | null
          specialty?: string | null
          status?: string | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          contact_name: string
          contract_signed: boolean | null
          created_at: string | null
          email: string
          id: string
          internal_notes: string | null
          organization: string
          package: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          contact_name: string
          contract_signed?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          internal_notes?: string | null
          organization: string
          package?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          contact_name?: string
          contract_signed?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          internal_notes?: string | null
          organization?: string
          package?: string | null
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
