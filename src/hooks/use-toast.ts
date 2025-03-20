// Re-export Sonner toast to maintain compatibility with both implementations
import { toast as sonnerToast } from 'sonner';

// Export types from the shadcn toast implementation
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

// Create a wrapper for the toast function that matches the expected signature
const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Re-export the shadcn toast interface, but use Sonner under the hood
export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
    toasts: [] // This is a placeholder to match the interface
  };
}

// Export the Sonner toast directly
export const toast = sonnerToast;
