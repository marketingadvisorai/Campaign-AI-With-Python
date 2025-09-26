import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet } from '@/lib/supabase/kvStore';

export async function GET(
  request: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    await getUserFromRequest(request);
    const campaigns = (await kvGet(`client:${params.clientId}:campaigns`)) || [];
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Get client campaigns error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
