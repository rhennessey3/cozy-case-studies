
import React from 'react';
import { useDeleteCaseStudy } from '@/hooks/case-study/use-delete-case-study';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteCaseStudyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
}

const DeleteCaseStudyDialog: React.FC<DeleteCaseStudyDialogProps> = ({ 
  open, 
  onOpenChange, 
  slug 
}) => {
  const { deleteCaseStudy } = useDeleteCaseStudy();

  const handleConfirmDelete = async () => {
    await deleteCaseStudy(slug);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this case study?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the case study and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirmDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCaseStudyDialog;
