import { Suspense } from 'react';
import MonthlyExpensesTable from '../_components/tables/monthly-expenses';
import TodaysExpensesTable from '../_components/tables/todays-expenses';

function ExpenseLog() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 border rounded-lg">
        <Suspense fallback={"Getting today's expenses..."}>
          <TodaysExpensesTable />
        </Suspense>
      </div>
      <div className="flex-1 border rounded-lg">
        <Suspense fallback={'Getting monthly expenses...'}>
          <MonthlyExpensesTable />
        </Suspense>
      </div>
    </div>
  );
}

export default ExpenseLog;
