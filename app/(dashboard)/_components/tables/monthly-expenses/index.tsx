import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMonthlyExpenses } from '@/lib/db-queries';
import { formatCurrencyInINR } from '@/lib/format';

async function MonthlyExpensesTable() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { rows } = await getMonthlyExpenses(month, year);
  return (
    <Table>
      <TableHeader>
        <TableHead>Name</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Amount</TableHead>
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.category_name}</TableCell>
            <TableCell>{formatCurrencyInINR(row.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MonthlyExpensesTable;