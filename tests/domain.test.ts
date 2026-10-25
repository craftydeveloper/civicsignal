import { describe, expect, it } from "vitest";
import { deduplicateAlerts } from "../src/domain/engine.js";
describe("civic alert aggregation", () => {
  it("expires old alerts and keeps the strongest duplicate", () => { const result=deduplicateAlerts([{id:"a",title:"Road closure",area:"North",source:"city",confidence:0.7,updatedAt:"2026-01-01T00:00:00Z",expiresAt:"2027-01-01T00:00:00Z"},{id:"b",title:" road closure ",area:"north",source:"transit",confidence:0.9,updatedAt:"2026-02-01T00:00:00Z",expiresAt:"2027-01-01T00:00:00Z"}],"2026-06-01T00:00:00Z"); expect(result).toHaveLength(1); expect(result[0]?.id).toBe("b"); });
  it("rejects malformed confidence values", () => { expect(()=>deduplicateAlerts([{id:"a",title:"x",area:"y",source:"z",confidence:2,updatedAt:"2026-01-01",expiresAt:"2027-01-01"}],"2026-06-01")).toThrow(RangeError); });
});