import ThisMonthExpenses from '../_components/cards/this-month-expense';
import TodaysTotalExpenses from '../_components/cards/todays-expenses';
import AddExpense from '../_components/forms/add-expense';
import MonthlyExpensesTable from '../_components/tables/monthly-expenses';
import TodaysExpensesTable from '../_components/tables/todays-expenses';

async function Dashboard() {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="flex gap-4 justify-center md:justify-start">
          <ThisMonthExpenses />
          <TodaysTotalExpenses />
        </div>
        <div className='flex justify-center md:justify-start'>
          <AddExpense />
        </div>
        <div className="flex flex-col gap-6">
          <TodaysExpensesTable />
          <MonthlyExpensesTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
