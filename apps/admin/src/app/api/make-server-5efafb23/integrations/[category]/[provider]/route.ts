import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet, kvSet } from '@/lib/supabase/kvStore';

export async function POST(
  request: Request,
  { params }: { params: { category: string; provider: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    const data = await request.json();
    const integrations = (await kvGet<Record<string, Record<string, unknown>>>(
      `user:${user.id}:integrations`
    )) || {};

    if (!integrations[params.category]) {
      integrations[params.category] = {};
    }

    integrations[params.category][params.provider] = {
      ...data,
      connectedAt: new Date().toISOString(),
      status: 'connected',
    };

    await kvSet(`user:${user.id}:integrations`, integrations);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save integration error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { category: string; provider: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    const integrations = (await kvGet<Record<string, Record<string, unknown>>>(
      `user:${user.id}:integrations`
    )) || {};

    if (integrations[params.category]?.[params.provider]) {
      delete integrations[params.category][params.provider];
    }

    await kvSet(`user:${user.id}:integrations`, integrations);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete integration error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
