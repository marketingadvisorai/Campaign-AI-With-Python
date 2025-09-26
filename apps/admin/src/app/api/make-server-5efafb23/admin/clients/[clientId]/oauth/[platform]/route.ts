import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvDelete, kvGet, kvSet } from '@/lib/supabase/kvStore';

export async function POST(
  request: Request,
  { params }: { params: { clientId: string; platform: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    const oauthData = await request.json();

    const client = await kvGet<any>(`client:${params.clientId}`);
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    if (!client.connectedAccounts.includes(params.platform)) {
      client.connectedAccounts.push(params.platform);
    }

    client.updatedAt = new Date().toISOString();
    await kvSet(`client:${params.clientId}`, client);

    await kvSet(`client:${params.clientId}:oauth:${params.platform}`, {
      ...oauthData,
      connectedAt: new Date().toISOString(),
      connectedBy: user.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('OAuth connection error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { clientId: string; platform: string } }
) {
  try {
    await getUserFromRequest(request);
    const client = await kvGet<any>(`client:${params.clientId}`);
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    client.connectedAccounts = client.connectedAccounts.filter(
      (platform: string) => platform !== params.platform
    );
    client.updatedAt = new Date().toISOString();
    await kvSet(`client:${params.clientId}`, client);

    await kvDelete(`client:${params.clientId}:oauth:${params.platform}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('OAuth disconnection error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
