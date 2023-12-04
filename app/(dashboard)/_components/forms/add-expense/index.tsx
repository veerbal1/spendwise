'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';
import CategorySelector from './_components/category-selector';
import { addExpense } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const initialState = {
  status: '',
  message: '',
};

function AddExpense() {
  const [state, dispatch] = useFormState(addExpense, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    switch (state.status) {
      case 'success':
        toast.success(state.message);
        formRef.current?.reset();
        break;
      case 'failed':
        toast.error(state.message);
        break;
      default:
        break;
    }
  }, [state.status, state.message, formRef]);

  return (
    <div className="m-6 mt-6 w-[300px]">
      <form ref={formRef} action={dispatch} className="flex flex-col gap-2">
        <Input name="expense" placeholder="e.g Milk" required />
        <CurrentTime />
        <Input
          name="amount"
          placeholder="e.g 10"
          required
          type="number"
          min={0}
        />
        <CategorySelector />
        <SubmitButton />
      </form>
    </div>
  );
}

const CurrentTime = () => {
  return (
    <Input
      type="date"
      name="date"
      required
      defaultValue={new Date().toISOString().split('T')[0]}
      max={new Date().toISOString().split('T')[0]}
    />
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button>
      {pending ? <ReloadIcon className="mr-2 animate-spin" /> : null}
      Add new item
    </Button>
  );
};

export default AddExpense;
