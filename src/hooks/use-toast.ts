
// Re-export Sonner toast to maintain compatibility with both implementations
import { toast as sonnerToast } from 'sonner';

// Export types from the shadcn toast implementation
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Interface for the shadcn toast format
interface ShadcnToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
}

// Create a wrapper that transforms shadcn toast interface to Sonner format
const createToastAdapter = () => {
  return {
    // This mimics the shadcn toast interface but uses Sonner under the hood
    toast: (props: ShadcnToastProps) => {
      if (props.variant === "destructive") {
        return sonnerToast.error(props.title as string, {
          description: props.description
        });
      } else {
        return sonnerToast.success(props.title as string, {
          description: props.description
        });
      }
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
    toasts: [] // This is a placeholder to match the interface
  };
};

// Export the wrapped toast interface
export function useToast() {
  return createToastAdapter();
}

// Export the native Sonner toast for direct usage
export const toast = sonnerToast;
