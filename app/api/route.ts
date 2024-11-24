import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  const response = {
    message: '호호호',
    data: '오늘도 코딩',
  };

  return NextResponse.json(response, { status: 200 });
}
