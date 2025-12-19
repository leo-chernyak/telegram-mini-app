import crypto from 'crypto';

export type WebAppAuthData = {
  userId: number;
};

function buildDataCheckString(params: URLSearchParams): string {
  const entries: Array<[string, string]> = [];
  params.forEach((value, key) => {
    if (key === 'hash') return;
    entries.push([key, value]);
  });
  entries.sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([k, v]) => `${k}=${v}`).join('\n');
}

function timingSafeEqualHex(a: string, b: string) {
  const ab = Buffer.from(a, 'hex');
  const bb = Buffer.from(b, 'hex');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function validateInitData(initData: string, botToken: string, maxAgeSeconds = 60 * 60): WebAppAuthData {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  const authDate = params.get('auth_date');
  const userRaw = params.get('user');

  if (!hash || !authDate || !userRaw) {
    throw new Error('Invalid initData: missing fields');
  }

  const authDateSec = Number(authDate);
  if (!Number.isFinite(authDateSec)) throw new Error('Invalid initData: auth_date');
  const nowSec = Math.floor(Date.now() / 1000);
  if (nowSec - authDateSec > maxAgeSeconds) throw new Error('initData expired');

  // secret_key = HMAC_SHA256("WebAppData", bot_token)
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const dataCheckString = buildDataCheckString(params);
  const computedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (!timingSafeEqualHex(computedHash, hash)) {
    throw new Error('Invalid initData: hash mismatch');
  }

  const user = JSON.parse(userRaw) as { id?: number };
  const userId = Number(user?.id);
  if (!Number.isFinite(userId)) throw new Error('Invalid initData: user.id');

  return { userId };
}


