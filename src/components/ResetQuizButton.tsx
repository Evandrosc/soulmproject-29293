import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useQuizStore } from '@/hooks/useQuizStore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useNavigateWithParams } from '@/hooks/use-navigate-with-params';

export const ResetQuizButton = () => {
  const navigate = useNavigateWithParams();
  const { reset } = useQuizStore();

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hidden md:flex"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete all your answers and you'll have to start the quiz from the beginning.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>
            Yes, start over
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
