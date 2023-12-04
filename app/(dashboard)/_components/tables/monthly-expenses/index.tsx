import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserExpenses } from '@/lib/db-queries';
import { formatCurrencyInINR } from '@/lib/format';

async function MonthlyExpensesTable() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { rows } = await getUserExpenses(month, year);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
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
