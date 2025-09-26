import { NextResponse } from 'next/server';
import { createServiceSupabaseClient } from '@/lib/supabase/server';
import { kvSet } from '@/lib/supabase/kvStore';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const supabase = createServiceSupabaseClient();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await kvSet(`user:${data.user.id}:setup`, { isSetupComplete: false });
    await kvSet(`user:${data.user.id}:integrations`, {});

    return NextResponse.json({ user: data.user });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
