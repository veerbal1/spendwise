import { auth } from '@/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { logout } from '@/lib/actions';
import SignoutButton from './signout-button';
import { getInitialsFromName } from '@/lib/format';

async function AvatarUI() {
  const session = await auth();
  const user = session?.user;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="">
          <AvatarFallback>
            {getInitialsFromName(user?.name as string)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        {user?.name}
        <br />
        {user?.email}
        <form action={logout}>
          <SignoutButton />
        </form>
      </PopoverContent>
    </Popover>
  );
}
export default AvatarUI;
