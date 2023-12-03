'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HTMLAttributes, useState } from 'react';
import { Icons } from './icons';
import { cn } from '@/lib/utils';
import { signUpAction } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import FormInput from './input';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

function SingupForm({ className, ...props }: UserAuthFormProps) {
  const [state, dispatch] = useFormState(signUpAction, undefined);
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={dispatch}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <FormInput
              id="name"
              label="Full Name"
              autoComplete="name"
              type="text"
              required
              placeholder="Full Name"
              name="name"
            />
            <FormInput
              id="email"
              label="Email"
              autoComplete="email"
              type="email"
              required
              placeholder="Email"
              name="email"
            />
            <FormInput
              id="password"
              label="Password"
              autoComplete="password"
              type="password"
              required
              placeholder="Password"
              name="password"
              min={6}
            />
            <p className="text-red-400 text-sm">{state}</p>
            <SignUpButton />
          </div>
        </div>
      </form>
    </div>
  );
}

const SignUpButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Sign Up
    </Button>
  );
};

export default SingupForm;
