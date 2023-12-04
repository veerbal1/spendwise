import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRecentlyAddedExpenses } from '@/lib/db-queries';
import { formatCurrencyInINR, formatTime } from '@/lib/format';

async function RecentlyAddedItems() {
  const { rows } = await getRecentlyAddedExpenses();
  return (
    <Table>
      <TableCaption>Recently Added Items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.description}</TableCell>
            <TableCell>{formatCurrencyInINR(row.amount)}</TableCell>
            <TableCell>{formatTime(new Date(row.created_at))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RecentlyAddedItems;
