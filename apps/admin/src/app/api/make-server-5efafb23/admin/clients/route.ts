import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet, kvGetByPrefix, kvSet } from '@/lib/supabase/kvStore';

function generateClientId() {
  const randomSegment = () => Math.floor(100 + Math.random() * 900);
  return `${randomSegment()}-${randomSegment()}-${randomSegment()}`;
}

export async function GET(request: Request) {
  try {
    await getUserFromRequest(request);
    const clientRecords = (await kvGetByPrefix<any>('client:')) || [];
    const clients = clientRecords.filter((client) => client && client.id);
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    const clientData = await request.json();

    const clientId = generateClientId();
    const tokensLimit =
      clientData.plan === 'Starter' ? 2500 : clientData.plan === 'Pro' ? 10000 : 25000;

    const client = {
      id: clientId,
      ...clientData,
      status: 'trial',
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      tokensUsed: 0,
      tokensLimit,
      monthlySpend: 0,
      campaigns: 0,
      connectedAccounts: [],
    };

    await kvSet(`client:${clientId}`, client);

    const adminClients = (await kvGet<string[]>(`admin:${user.id}:clients`)) || [];
    adminClients.push(clientId);
    await kvSet(`admin:${user.id}:clients`, adminClients);

    return NextResponse.json(client);
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
