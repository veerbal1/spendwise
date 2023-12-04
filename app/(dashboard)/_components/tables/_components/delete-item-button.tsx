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
      {pending ? (
        <ReloadIcon className="animate-spin text-red-500" />
      ) : (
        <TrashIcon className="text-red-500" />
      )}
    </Button>
  );
};

export default DeleteItemButton;
