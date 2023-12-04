import SimpleCard from '@/app/_components/card/simple';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMonthlyTotalExpenses } from '@/lib/db-queries';
import { formatCurrencyInINR } from '@/lib/format';

async function ThisMonthExpenses() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { totalExpense } = await getMonthlyTotalExpenses(month, year);
  return (
    <SimpleCard
      title="This Month's Expenditure"
      content={formatCurrencyInINR(totalExpense)}
    />
  );
}

export default ThisMonthExpenses;
