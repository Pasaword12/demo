import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone = '', userType = '', department = '' } = body

    if (!name || !email) {
      return new NextResponse('Nombre y email son requeridos', { status: 400 })
    }

    const inserted = await sql`
      INSERT INTO "User" (name, email, phone, "userType", department)
      VALUES (${name}, ${email}, ${phone}, ${userType}, ${department})
      RETURNING id, name, email, phone, "userType", department, status, "memberSince"
    `

    const user = inserted[0]
    return NextResponse.json(user)
  } catch (err: any) {
    console.error('API /api/usuarios/register error:', err)
    return new NextResponse(String(err?.message ?? 'Error interno'), { status: 500 })
  }
}
