export type Plan = 'month' | 'year';

export type SubscriptionRecord = {
  plan: Plan;
  expiresAt: number; // unix ms
};

export type SubscriptionStatus = 'active' | 'inactive' | 'expired';

export type SubscriptionStore = {
  get(userId: number): SubscriptionRecord | undefined;
  set(userId: number, record: SubscriptionRecord): void;
  getStatus(userId: number): { status: SubscriptionStatus; record?: SubscriptionRecord };
  applyPayment(userId: number, plan: Plan, paidAtMs: number): SubscriptionRecord;
};

function addDays(ms: number, days: number) {
  return ms + days * 24 * 60 * 60 * 1000;
}

function planDurationDays(plan: Plan) {
  return plan === 'year' ? 365 : 30;
}

export function createSubscriptionStore(): SubscriptionStore {
  const map = new Map<number, SubscriptionRecord>();

  return {
    get(userId) {
      return map.get(userId);
    },
    set(userId, record) {
      map.set(userId, record);
    },
    getStatus(userId) {
      const record = map.get(userId);
      if (!record) return { status: 'inactive' };
      const now = Date.now();
      if (record.expiresAt > now) return { status: 'active', record };
      return { status: 'expired', record };
    },
    applyPayment(userId, plan, paidAtMs) {
      const existing = map.get(userId);
      const base = existing && existing.expiresAt > paidAtMs ? existing.expiresAt : paidAtMs;
      const expiresAt = addDays(base, planDurationDays(plan));
      const record: SubscriptionRecord = { plan, expiresAt };
      map.set(userId, record);
      return record;
    }
  };
}


