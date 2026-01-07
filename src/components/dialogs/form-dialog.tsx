import { useState } from "react";

import { Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => void | Promise<void>;
  loading?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  hideFooter?: boolean;
}

const maxWidthClasses = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[525px]",
  lg: "sm:max-w-[725px]",
  xl: "sm:max-w-[925px]",
  "2xl": "sm:max-w-[1125px]",
};

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit,
  loading: externalLoading,
  maxWidth = "sm",
  hideFooter = false,
}: FormDialogProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = externalLoading ?? internalLoading;

  const handleSubmit = async () => {
    if (!onSubmit) return;

    try {
      setInternalLoading(true);
      await onSubmit();
      onOpenChange(false);
    } catch (error) {
      // Error handling is done by the parent component (e.g., toast)
      console.error("FormDialog error:", error);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={maxWidthClasses[maxWidth]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="py-4 px-1">{children}</div>
        </ScrollArea>
        {!hideFooter && (
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {cancelText}
            </Button>
            {onSubmit && (
              <Button type="button" onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
