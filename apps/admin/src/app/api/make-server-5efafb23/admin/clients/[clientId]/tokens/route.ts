import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet, kvSet } from '@/lib/supabase/kvStore';

export async function POST(
  request: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    const { tokensUsed, cost } = await request.json();

    const client = await kvGet<any>(`client:${params.clientId}`);
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    client.tokensUsed += tokensUsed;
    client.monthlySpend += cost;
    client.updatedAt = new Date().toISOString();

    await kvSet(`client:${params.clientId}`, client);

    const billingLog = (await kvGet<any[]>(`client:${params.clientId}:billing`)) || [];
    billingLog.push({
      timestamp: new Date().toISOString(),
      tokensUsed,
      cost,
      adminId: user.id,
    });
    await kvSet(`client:${params.clientId}:billing`, billingLog);

    return NextResponse.json({ success: true, client });
  } catch (error) {
    console.error('Token billing error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
