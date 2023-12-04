import SimpleCard from '@/app/_components/card/simple';
import { getTodaysTotalExpenses } from '@/lib/db-queries';
import { formatCurrencyInINR } from '@/lib/format';

async function TodaysTotalExpenses() {
  const today = new Date().toDateString();
  const { totalExpense } = await getTodaysTotalExpenses(today);
  return (
    <SimpleCard
      title="Today's Spending Summary"
      content={formatCurrencyInINR(totalExpense)}
    />
  );
}

export default TodaysTotalExpenses;
