import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    await getUserFromRequest(request);

    const metrics = {
      totalSpend: 124500,
      tokensUsed: 8500,
      tokensLimit: 10000,
      activeCampaigns: 24,
      conversions: 1847,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Get metrics error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
