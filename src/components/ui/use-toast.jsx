import { toast as sonnerToast } from "sonner";

export const toast = ({ title, description, variant = "default", ...props }) => {
  if (variant === "success") {
    return sonnerToast.success(description);
  }
  
  if (variant === "destructive" || variant === "error") {
    return sonnerToast.error(description);
  }
  
  return sonnerToast(description || title);
};

export { toast as useToast }; 