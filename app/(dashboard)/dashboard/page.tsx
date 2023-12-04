import ThisMonthExpenses from '../_components/cards/this-month-expense';
import AddExpense from '../_components/forms/add-expense';
import MonthlyExpensesTable from '../_components/tables/monthly-expenses';

async function Dashboard() {
  return (
    <div className="w-full">
      <ThisMonthExpenses />
      <MonthlyExpensesTable />
      <AddExpense />
    </div>
  );
}

export default Dashboard;
