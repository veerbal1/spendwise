'use client';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { ExitIcon, ReloadIcon } from '@radix-ui/react-icons';

function SignoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? (
        <ReloadIcon className="animate-spin mr-2" />
      ) : (
        <ExitIcon className="mr-2" />
      )}
      Sign Out
    </Button>
  );
}

export default SignoutButton;
