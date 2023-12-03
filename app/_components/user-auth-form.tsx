'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { Button } from '@/components/ui/button';

import { authenticate } from '@/lib/actions';

import { useFormState, useFormStatus } from 'react-dom';
import FormInput from './input';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={dispatch}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <FormInput
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              label="Email"
              required
            />
            <FormInput
              id="password"
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              autoComplete="password"
              required
            />

            <div className="flex h-8 items-end space-x-1">
              {state === 'CredentialsSignin' && (
                <>
                  <p aria-live="polite" className="text-sm text-red-500">
                    Invalid credentials
                  </p>
                </>
              )}
            </div>
          </div>
          <SignInButton />
        </div>
      </form>
    </div>
  );
}

const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Sign In
    </Button>
  );
};
