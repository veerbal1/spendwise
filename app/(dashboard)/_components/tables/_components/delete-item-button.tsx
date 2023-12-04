'use client';

import { Button } from '@/components/ui/button';
import { deleteExpense } from '@/lib/actions';
import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

const initialState = {
  status: '',
  message: '',
};

function DeleteItemButton({ id }: { id: string }) {
  const dispatchWrapper = () => deleteExpense(id);
  const [state, formAction] = useFormState(dispatchWrapper, initialState);
  useEffect(() => {
    switch (state.status) {
      case 'success':
        toast.success(state.message);
        break;
      case 'failed':
        toast.error(state.message);
      default:
        break;
    }
  }, [state.status, state.message]);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="bg-transparent">
      {pending ? <ReloadIcon className='animate-spin'/> : <TrashIcon className="text-red-500" />}
    </Button>
  );
};

export default DeleteItemButton;
