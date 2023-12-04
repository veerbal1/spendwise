'use server';

import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

export const getMonthlyTotalExpenses = async (month: number, year: number) => {
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
export const getTodaysTotalExpenses = async (today: string) => {
  const session = await auth();
  const userId = session?.user.id;
  try {
    const { rows } = await sql`
    SELECT
      SUM(amount) AS total_expenses
    FROM 
      spendwise_expenses
    WHERE
      user_id = ${userId}
    AND 
      date = ${today};
    `;
    return {
      status: 'success',
      message: "Today's Expenses calculated",
      totalExpense: rows.length > 0 ? rows[0].total_expenses : 0,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};
export const getRecentlyAddedExpenses = async () => {
  const session = await auth();
  const userId = session?.user.id;
  try {
    const { rows } = await sql`
    SELECT
      id,
      description,
      amount,
      date,
      created_at
    FROM 
        spendwise_expenses
    WHERE
      spendwise_expenses.user_id = ${userId}
    ORDER BY 
      created_at 
    DESC
    LIMIT 5
    `;
    return {
      status: 'success',
      message: "Today's Expenses calculated",
      rows,
    };
  } catch (error) {
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
};

export const getUserExpenses = async (startDate: string, endDate: string) => {
  const session = await auth();
  const userId = session?.user.id;
  try {
    const { rows, rowCount } = await sql`
    SELECT
      id,
      description,
      amount,
      date
    FROM 
        spendwise_expenses
    WHERE
      spendwise_expenses.user_id = ${userId}
    AND
      spendwise_expenses.date >= ${startDate}
    AND
      spendwise_expenses.date <= ${endDate};
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

// getExpenseById(expenseId)
// Fetch detailed information about a specific expense by its ID.

// getExpensesByCategory(userId, categoryId, startDate, endDate)
// Retrieve expenses for a user filtered by a specific category and date range.

// getUserCategories(userId)
// Fetch all the expense categories associated with a user.

// getMonthlyExpenseBreakdown(userId, year, month)
// Provide a breakdown of expenses by category for a specific month.

// getAnnualExpenseSummary(userId, year)
// Summarize the total expenses for each month in a given year.

// getUserBudgets(userId)
// Retrieve all budget settings for a user.

// getRecentTransactions(userId, limit)
// Fetch the most recent transactions for a user, with a limit to the number of transactions returned.

// getUserAlerts(userId)
// Retrieve any alerts or notifications related to the user's expenses or budget.
