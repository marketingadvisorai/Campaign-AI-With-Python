import { createServiceSupabaseClient } from './server';

const TABLE_NAME = 'kv_store_5efafb23';

export async function kvSet(key: string, value: unknown) {
  const supabase = createServiceSupabaseClient();
  const { error } = await supabase.from(TABLE_NAME).upsert({ key, value });
  if (error) {
    throw new Error(error.message);
  }
}

export async function kvGet<T = unknown>(key: string) {
  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .eq('key', key)
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return (data?.value as T | undefined) ?? null;
}

export async function kvDelete(key: string) {
  const supabase = createServiceSupabaseClient();
  const { error } = await supabase.from(TABLE_NAME).delete().eq('key', key);
  if (error) {
    throw new Error(error.message);
  }
}

export async function kvGetByPrefix<T = unknown>(prefix: string) {
  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('key, value')
    .like('key', `${prefix}%`);
  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []).map((record) => record.value as T);
}
