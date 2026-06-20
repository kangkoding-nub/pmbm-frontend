import { apiCore } from "@/services/api";
import type { YearType, LandingDataType, RulesDataType, ScheduleData } from "@/types";
const api = new apiCore();
export async function year(params: Record<string,any>={}, n=false): Promise<YearType|undefined> { return api.get<YearType>("public/year",params,n).then((r)=>r.result); }
export async function landing(params: Record<string,any>={}): Promise<LandingDataType|undefined> { return api.get<LandingDataType>("public/landing",params).then((r)=>r.result).catch(()=>undefined); }
export async function rules(params: Record<string,any>={}): Promise<RulesDataType|undefined> { return api.get<RulesDataType>("public/rules",params).then((r)=>r.result).catch(()=>undefined); }
export async function schedule(params: Record<string,any>={}): Promise<ScheduleData|undefined> { return api.get<ScheduleData>("public/schedule",params).then((r)=>r.result).catch(()=>undefined); }
