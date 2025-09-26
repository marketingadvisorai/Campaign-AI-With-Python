import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet, kvSet } from '@/lib/supabase/kvStore';

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    const campaigns = (await kvGet(`user:${user.id}:campaigns`)) || [];
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Get campaigns error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    const campaignData = await request.json();

    const campaign = {
      id: `camp_${Date.now()}`,
      ...campaignData,
      userId: user.id,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    const campaigns = (await kvGet<any[]>(`user:${user.id}:campaigns`)) || [];
    campaigns.push(campaign);

    await kvSet(`user:${user.id}:campaigns`, campaigns);
    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
