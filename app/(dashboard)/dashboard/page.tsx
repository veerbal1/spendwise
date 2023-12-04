import { Suspense } from 'react';
import ThisMonthExpenses from '../_components/cards/this-month-expense';
import TodaysTotalExpenses from '../_components/cards/todays-expenses';
import AddExpense from '../_components/forms/add-expense';
import MonthlyExpensesTable from '../_components/tables/monthly-expenses';
import TodaysExpensesTable from '../_components/tables/todays-expenses';
import RecentlyAddedItems from '../_components/tables/recent-added-items';

async function Dashboard() {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="flex gap-4 justify-center md:justify-start flex-wrap">
          <Suspense fallback={'Getting total expenses of this month...'}>
            <ThisMonthExpenses />
          </Suspense>
          <Suspense fallback={"Getting today's total expenses..."}>
            <TodaysTotalExpenses />
          </Suspense>
        </div>
        <div className="flex justify-center md:justify-start">
          <Suspense fallback={'Loading Add Expense form...'}>
            <AddExpense />
          </Suspense>
        </div>
        <div className="flex flex-col gap-6">
          <Suspense fallback="Getting recently added items...">
            <RecentlyAddedItems />
          </Suspense>
          {/* <TodaysExpensesTable /> */}
          {/* <MonthlyExpensesTable /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
