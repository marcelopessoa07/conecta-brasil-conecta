
// Import from the right path to avoid circular dependencies
import { toast } from "sonner";
import { useToast as useToastHook } from "@/components/ui/toast";

export const useToast = useToastHook;
export { toast };
