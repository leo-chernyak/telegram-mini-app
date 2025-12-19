"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionStore = createSubscriptionStore;
function addDays(ms, days) {
    return ms + days * 24 * 60 * 60 * 1000;
}
function planDurationDays(plan) {
    return plan === 'year' ? 365 : 30;
}
function createSubscriptionStore() {
    const map = new Map();
    return {
        get(userId) {
            return map.get(userId);
        },
        set(userId, record) {
            map.set(userId, record);
        },
        getStatus(userId) {
            const record = map.get(userId);
            if (!record)
                return { status: 'inactive' };
            const now = Date.now();
            if (record.expiresAt > now)
                return { status: 'active', record };
            return { status: 'expired', record };
        },
        applyPayment(userId, plan, paidAtMs) {
            const existing = map.get(userId);
            const base = existing && existing.expiresAt > paidAtMs ? existing.expiresAt : paidAtMs;
            const expiresAt = addDays(base, planDurationDays(plan));
            const record = { plan, expiresAt };
            map.set(userId, record);
            return record;
        }
    };
}
