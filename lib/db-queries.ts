'use server';

import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

export const getTotalMonthlyExpenses = async (month: number, year: number) => {
  const session = await auth();
  const userId = session?.user.id;
  try {
    const { rows } = await sql`
    SELECT
        SUM(amount) AS total_expenses
        FROM spendwise_expenses
    WHERE
        user_id = ${userId}
    AND
        EXTRACT(YEAR FROM date) = ${year}
    AND
        EXTRACT(MONTH FROM date) = ${month};
    `;
    return {
      status: 'success',
      message: 'Expenses calculated',
      totalExpense: rows.length > 0 ? rows[0].total_expenses : 0,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};
