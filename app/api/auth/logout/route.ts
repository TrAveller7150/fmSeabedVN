import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('session_id')?.value

    if (sessionId) {
      await deleteSession(sessionId)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.delete('session_id')

    return response
  } catch (error) {
    console.error('登出错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
