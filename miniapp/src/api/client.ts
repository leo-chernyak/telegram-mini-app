type ApiError = { ok?: false; error?: string };

function getInitData() {
  return window.Telegram?.WebApp?.initData ?? '';
}

export async function apiPost<T>(path: string, body: Record<string, unknown>) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, initData: getInitData() })
  });

  const json = (await res.json()) as T | ApiError;
  if (!res.ok || (json as any)?.ok === false) {
    const msg = (json as any)?.error ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json as T;
}

export async function apiGet<T>(path: string) {
  const res = await fetch(path, { method: 'GET' });
  const json = (await res.json()) as T | ApiError;
  if (!res.ok || (json as any)?.ok === false) {
    const msg = (json as any)?.error ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json as T;
}


