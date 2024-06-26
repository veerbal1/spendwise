'use client';
import { QueryResultRow } from '@vercel/postgres';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, compareAsc } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Daily Total Expenses for the Month',
    },
  },
};

function MonthlyChart({ rows }: { rows: QueryResultRow[] | undefined }) {
  const currentMonthData = rows
    ?.filter((row) => {
      const expenseDate = new Date(row.date);
      const today = new Date();
      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    })
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));
  const summedDailyExpenses = currentMonthData?.reduce((acc, row) => {
    const expenseDate = new Date(row.date).toISOString().split('T')[0];
    const formattedDate = format(expenseDate, 'PP');

    if (!acc[formattedDate]) {
      acc[formattedDate] = 0;
    }
    acc[formattedDate] += row.amount;
    return acc;
  }, {});

  if (!summedDailyExpenses) {
    return null;
  }

  const labels = summedDailyExpenses ? Object.keys(summedDailyExpenses) : [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: labels.map((key) => summedDailyExpenses[key]),
        borderColor: 'rgb(0, 128, 0)',
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default MonthlyChart;
