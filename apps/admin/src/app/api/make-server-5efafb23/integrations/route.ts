import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet } from '@/lib/supabase/kvStore';

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    const integrations = (await kvGet(`user:${user.id}:integrations`)) || {};
    return NextResponse.json(integrations);
  } catch (error) {
    console.error('Get integrations error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
