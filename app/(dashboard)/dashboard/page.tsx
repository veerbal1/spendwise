import ThisMonthExpenses from '../_components/cards/this-month-expense';
import MonthlyExpensesTable from '../_components/tables/monthly-expenses';

async function Dashboard() {
  return (
    <div className="w-full">
      <ThisMonthExpenses />
      <MonthlyExpensesTable />
    </div>
  );
}

export default Dashboard;
