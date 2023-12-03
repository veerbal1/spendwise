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

export const getMonthlyExpenses = async (month: number, year: number) => {
  const session = await auth();
  const userId = session?.user.id;
  try {
    const { rows, rowCount } = await sql`
    SELECT
      spendwise_expenses.id,
      spendwise_expenses.description,
      spendwise_expenses.amount,
      spendwise_categories.name as category_name
    FROM 
        spendwise_expenses
    INNER JOIN 
      spendwise_categories
    ON
      spendwise_expenses.category_id = spendwise_categories.id
    WHERE
      spendwise_expenses.user_id = ${userId}
    `;
    return {
      status: 'success',
      message: 'Expenses calculated',
      rows,
      rowCount,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};
