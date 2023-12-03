import { getTotalMonthlyExpenses } from '@/lib/db-queries';
import ThisMonthExpenses from '../_components/cards/this-month-expense';

async function Dashboard() {
  return (
    <div className="w-full">
      <ThisMonthExpenses />
    </div>
  );
}

export default Dashboard;
