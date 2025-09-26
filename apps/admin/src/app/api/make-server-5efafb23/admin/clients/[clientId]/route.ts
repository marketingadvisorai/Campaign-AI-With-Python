import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/server";
import { kvDelete, kvGet, kvSet } from "@/lib/supabase/kvStore";

// Define a type for Client
type Client = {
  id: string;
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  // add other fields your client has
};

export async function GET(
  request: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    await getUserFromRequest(request);

    const client = (await kvGet(`client:${params.clientId}`)) as Client | null;

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Get client error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    const updateData = (await request.json()) as Partial<Client>;

    const existingClient = (await kvGet(
      `client:${params.clientId}`
    )) as Client | null;

    if (!existingClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const updatedClient: Client = {
      ...existingClient,
      ...updateData,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id,
    };

    await kvSet(`client:${params.clientId}`, updatedClient);
    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Update client error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const user = await getUserFromRequest(request);

    await kvDelete(`client:${params.clientId}`);

    const adminClients =
      ((await kvGet<string[]>(`admin:${user.id}:clients`)) as string[]) || [];

    const updatedClients = adminClients.filter((id) => id !== params.clientId);
    await kvSet(`admin:${user.id}:clients`, updatedClients);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete client error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
