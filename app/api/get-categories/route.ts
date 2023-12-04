import { auth } from '@/auth';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({
      status: 'failed',
      message: 'Not Authorized',
    });
  }

  try {
    const { rows } = await sql`
        SELECT id, name from spendwise_categories;
    `;
    return NextResponse.json({
      status: 'success',
      message: 'Fetched categories',
      data: rows,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
}
