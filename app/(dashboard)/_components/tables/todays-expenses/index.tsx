import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserExpenses } from '@/lib/db-queries';
import { formatCurrencyInINR } from '@/lib/format';
import DeleteItemButton from '../_components/delete-item-button';

async function TodaysExpensesTable() {
  const today = new Date();

  const { rows } = await getUserExpenses(
    today.toDateString(),
    today.toDateString()
  );
  return (
    <Table>
      <TableCaption>Today&apos;s expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.description}</TableCell>
            <TableCell>{formatCurrencyInINR(row.amount)}</TableCell>
            <TableCell>{row.date.toDateString()}</TableCell>
            <TableCell>
              <DeleteItemButton id={row.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TodaysExpensesTable;
