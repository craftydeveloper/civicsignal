export interface CivicAlert { id: string; title: string; area: string; source: string; confidence: number; updatedAt: string; expiresAt: string }
function fingerprint(alert:CivicAlert):string{return alert.title.normalize("NFKC").trim().toLocaleLowerCase()+"|"+alert.area.normalize("NFKC").trim().toLocaleLowerCase();}
export function deduplicateAlerts(alerts: readonly CivicAlert[], now: string): CivicAlert[] {
  const timestamp=Date.parse(now);if(!Number.isFinite(timestamp))throw new TypeError("now must be a valid timestamp");const winners=new Map<string,CivicAlert>();
  for(const alert of alerts){if(Date.parse(alert.expiresAt)<=timestamp)continue;if(!Number.isFinite(alert.confidence)||alert.confidence<0||alert.confidence>1)throw new RangeError("confidence must be between 0 and 1");const key=fingerprint(alert);const current=winners.get(key);if(!current||alert.confidence>current.confidence||(alert.confidence===current.confidence&&alert.updatedAt>current.updatedAt))winners.set(key,alert);}
  return [...winners.values()].sort((a,b)=>b.confidence-a.confidence||a.title.localeCompare(b.title));
}