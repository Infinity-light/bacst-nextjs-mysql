import {NextResponse} from "next/server";
import { pool } from '@/lib/db'


export async function POST(request) {
    try {
        // 从连接池获取连接
        const connection = await pool.getConnection()
        // 获取请求体数据
        const data = await request.json()
        // 执行插入操作
        const [result] = await connection.query(
            'INSERT INTO partnerLogos SET ?',
            data
        )

        // 释放连接
        connection.release()
        // 返回插入成功的响应
        return NextResponse.json({ 
            message: 'Data inserted successfully',
            insertId: result.insertId 
        }, { status: 201 })
    } catch (error) {
        console.error('Error inserting homeData:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}