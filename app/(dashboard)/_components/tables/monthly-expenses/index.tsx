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

async function MonthlyExpensesTable() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const { rows } = await getUserExpenses(
    firstDayOfMonth.toDateString(),
    today.toDateString()
  );
  return (
    <Table>
      <TableCaption>Monthly expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.description}</TableCell>
            <TableCell>{formatCurrencyInINR(row.amount)}</TableCell>
            <TableCell>{row.date.toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MonthlyExpensesTable;
