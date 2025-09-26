import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet } from '@/lib/supabase/kvStore';

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    const setupData = (await kvGet(`user:${user.id}:setup`)) || { isSetupComplete: false };
    return NextResponse.json(setupData);
  } catch (error) {
    console.error('Setup status error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
