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
import { compareAsc, format } from 'date-fns';

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
      text: 'Total Monthly Expenses for the Year',
    },
  },
};

function YearlyChart({ rows }: { rows: QueryResultRow[] | undefined }) {
  const currentYearData = rows?.sort((a, b) =>
    compareAsc(new Date(a.date), new Date(b.date))
  );

  const sumByMonth = currentYearData?.reduce((acc, { amount, date }) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const yearMonth = `${year}-${month}`;
    const formatted = format(yearMonth, 'MMMM yyyy');
    if (!acc[formatted]) {
      acc[formatted] = { year, month, sum: 0 };
    }
    acc[formatted].sum += amount;
    return acc;
  }, {});

  if (!sumByMonth) return null;

  const labels = Object.keys(sumByMonth as {});

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: labels.map((label: string) => {
          return sumByMonth[label].sum;
        }),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default YearlyChart;
