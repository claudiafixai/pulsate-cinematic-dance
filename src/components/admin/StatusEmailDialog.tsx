import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  recipientName?: string;
  newStatus: string;
  onConfirm: (sendEmail: boolean) => void;
}

const StatusEmailDialog = ({ open, recipientName, newStatus, onConfirm }: Props) => (
  <AlertDialog open={open}>
    <AlertDialogContent className="bg-card border-border">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-foreground">Send status email?</AlertDialogTitle>
        <AlertDialogDescription>
          Send a status update email to <strong>{recipientName}</strong> notifying them their status is now <strong>{newStatus}</strong>?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => onConfirm(false)} className="border-border">No, just save</AlertDialogCancel>
        <AlertDialogAction onClick={() => onConfirm(true)} className="btn-primary">Yes, send email</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default StatusEmailDialog;
