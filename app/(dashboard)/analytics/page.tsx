import { getUserExpenses } from '@/lib/db-queries';
import MonthlyChart from './_components/monthly-chart';
import YearlyChart from './_components/yearly-chart';

async function Anlytics() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

  const { rows } = await getUserExpenses(
    firstDayOfYear.toDateString(),
    today.toDateString()
  );

  console.log('rows', rows);
  return (
    <div className="flex gap-2 w-full h-full">
      <div className="flex-1">
        <MonthlyChart rows={rows} />
      </div>
      <div className="flex-1">
        <YearlyChart rows={rows} />
      </div>
    </div>
  );
}

export default Anlytics;
