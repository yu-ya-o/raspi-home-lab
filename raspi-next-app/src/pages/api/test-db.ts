import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    })
    const [rows] = await connection.execute('SELECT NOW()')
    connection.end()
    res.status(200).json({ success: true, data: rows })
  } catch (error) {
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : error })
  }
}
