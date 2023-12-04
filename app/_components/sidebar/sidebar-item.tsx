'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({
  item,
}: {
  item: {
    title: string;
    link: string;
  };
}) {
  const pathname = usePathname();
  return (
    <Link href={item.link}>
      <Button
        variant="secondary"
        className={cn(
          'w-full justify-start bg-transparent',
          pathname === item.link ? 'bg-gray-200' : ''
        )}
      >
        {item.title}
      </Button>
    </Link>
  );
}

export default NavLink;
