import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGetByPrefix } from '@/lib/supabase/kvStore';

export async function GET(request: Request) {
  try {
    await getUserFromRequest(request);
    const clientRecords = (await kvGetByPrefix<any>('client:')) || [];
    const clients = clientRecords.filter((client) => client && client.id);

    const analytics = {
      totalClients: clients.length,
      activeClients: clients.filter((c: any) => c.status === 'active').length,
      totalRevenue: clients.reduce((sum: number, c: any) => sum + (c.monthlySpend || 0), 0),
      totalTokensUsed: clients.reduce((sum: number, c: any) => sum + (c.tokensUsed || 0), 0),
      totalCampaigns: clients.reduce((sum: number, c: any) => sum + (c.campaigns || 0), 0),
      clientStatusDistribution: {
        active: clients.filter((c: any) => c.status === 'active').length,
        trial: clients.filter((c: any) => c.status === 'trial').length,
        paused: clients.filter((c: any) => c.status === 'paused').length,
        cancelled: clients.filter((c: any) => c.status === 'cancelled').length,
      },
      topClients: clients
        .sort((a: any, b: any) => (b.monthlySpend || 0) - (a.monthlySpend || 0))
        .slice(0, 5)
        .map((client: any) => ({
          id: client.id,
          name: client.name,
          monthlySpend: client.monthlySpend || 0,
          tokensUsed: client.tokensUsed || 0,
        })),
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Get analytics error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
