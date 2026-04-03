import { NextResponse } from "next/server";
import { pool } from '@/lib/db'

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM jobs ORDER BY created_at DESC');
    connection.release();
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}