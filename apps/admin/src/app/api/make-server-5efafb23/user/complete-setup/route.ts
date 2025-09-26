import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvSet } from '@/lib/supabase/kvStore';

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    const setupData = await request.json();

    await kvSet(`user:${user.id}:setup`, {
      isSetupComplete: true,
      completedAt: new Date().toISOString(),
      setupData,
    });

    const workspaceId = `ws_${user.id}_${Date.now()}`;
    await kvSet(`user:${user.id}:workspace`, {
      id: workspaceId,
      name: 'Default Workspace',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Complete setup error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
