import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/supabase/server';
import { kvGet } from '@/lib/supabase/kvStore';

export async function GET(
  request: Request,
  { params }: { params: { category: string; provider: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    const integrations = (await kvGet<Record<string, Record<string, any>>>(
      `user:${user.id}:integrations`
    )) || {};

    const integration = integrations[params.category]?.[params.provider];
    if (!integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    }

    let testResult = { success: false, message: 'Unknown provider' };

    switch (params.provider) {
      case 'openai':
        testResult = await testOpenAI(integration.api_key);
        break;
      case 'anthropic':
        testResult = await testAnthropic(integration.api_key);
        break;
      case 'google_ai':
        testResult = await testGoogleAI(integration.api_key);
        break;
      default:
        testResult = { success: true, message: 'Test not implemented for this provider' };
    }

    return NextResponse.json(testResult);
  } catch (error) {
    console.error('Test integration error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function testOpenAI(apiKey: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return { success: true, message: 'OpenAI connection successful' };
    }

    return { success: false, message: 'OpenAI API key invalid' };
  } catch (error) {
    return { success: false, message: `OpenAI test failed: ${(error as Error).message}` };
  }
}

async function testAnthropic(apiKey: string) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }],
      }),
    });

    if (response.ok || response.status === 400) {
      return { success: true, message: 'Anthropic connection successful' };
    }

    return { success: false, message: 'Anthropic API key invalid' };
  } catch (error) {
    return { success: false, message: `Anthropic test failed: ${(error as Error).message}` };
  }
}

async function testGoogleAI(apiKey: string) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    );

    if (response.ok) {
      return { success: true, message: 'Google AI connection successful' };
    }

    return { success: false, message: 'Google AI API key invalid' };
  } catch (error) {
    return { success: false, message: `Google AI test failed: ${(error as Error).message}` };
  }
}
