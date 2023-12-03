import { Metadata } from 'next';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { UserAuthForm } from '../_components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';

export default function AuthenticationPage() {
  return (
    <>
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Join Us
      </Link>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log in to Your Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  );
}
