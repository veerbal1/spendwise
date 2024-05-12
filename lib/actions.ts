'use server';
import { auth, signIn, signOut } from '@/auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { createClient } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid Email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export async function signUpAction(
  prevState: string | undefined,
  formData: FormData
) {
  let success = false;
  try {
    const client = createClient();
    await client.connect();
    const formDataObject = Object.fromEntries(formData);
    // Validate the form data using the Zod schema
    const validatedData = signUpSchema.parse(formDataObject);
    console.log('Validated data', validatedData);

    const { rowCount, rows: singleUser } =
      await client.sql`SELECT id FROM spendwise_users WHERE email = ${validatedData.email};`;
    console.log('email query ran');
    if (rowCount) return 'User already exists';

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const { rows } = await client.sql`
      INSERT INTO spendwise_users(name, email, password) VALUES(${validatedData.name}, ${validatedData.email}, ${hashedPassword});`;
    console.log(rows);
    success = true;
    console.log('User Submitted successfully');
    await client.end();
    return 'User Submitted Successfully';
  } catch (error) {
    console.log('Signup error');
    if (error instanceof z.ZodError) {
      // Log or return the validation error messages
      console.error(error.errors);
      return error.errors.map((err) => err.message).join(', ');
    }

    if ((error as Error).message.includes('CredentialsSignup')) {
      return 'CredentialsSignup';
    }
    return JSON.stringify(error);
  } finally {
    if (success) {
      redirect('/');
    }
  }
}

export async function logout() {
  await signOut();
}

export async function addExpense(prevState: any, formData: FormData) {
  try {
    const client = createClient();
    await client.connect();
    const session = await auth();
    const userId = session?.user.id;
    const { expense, amount, date } = Object.fromEntries(formData);
    await client.sql`
      INSERT INTO
        spendwise_expenses
        (user_id, amount, description, date)
      VALUES(
          ${userId as string}, 
          ${amount as string},
          ${expense as string},
          ${date as string}
          )
    `;
    revalidatePath('/dashboard');
    revalidatePath('/expense-log');
    await client.end();
    return {
      id: Math.random().toString(),
      status: 'success',
      message: 'Expense added successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      id: Math.random().toString(),
      status: 'failed',
      message: 'Something went wrong',
    };
  }
}

export async function deleteExpense(id: string) {
  console.log('DELETE Expense', id);
  try {
    const client = createClient();
    await client.connect();
    await client.sql`
      DELETE FROM spendwise_expenses WHERE id = ${id};
    `;
    console.log('Item deleted successfully');
    revalidatePath('/dashboard');
    revalidatePath('/expense-log');
    return {
      status: 'success',
      message: 'Expense deleted successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'failed',
      message: 'Something went wrong',
    };
  }
}

/** 
 * addExpense(userId, amount, categoryId, description, date)

Add a new expense entry to the database.
updateExpense(expenseId, amount, categoryId, description, date)

Update an existing expense entry.
deleteExpense(expenseId)

Delete an expense entry from the database.
addCategory(userId, categoryName)

Add a new category to a user's list of categories.
deleteCategory(categoryId)

Delete a category from the user's list.
updateUserBudget(userId, budgetDetails)

Update budget settings for a user.
 */
