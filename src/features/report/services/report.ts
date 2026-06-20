import { apiCore } from "@/services/api";
import type { ApiResponseInterface } from "@/types";

const api = new apiCore();
const dl = (response: any, fn: string) => {
    const u = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a"); a.href=u;
    const cd = response.headers["content-disposition"]; if (cd) { const m = cd.match(/filename="?(.+)"?/i); if (m?.[1]) fn = m[1]; } a.setAttribute("download", fn); document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(u); };

export async function getInvoiceReport<T>(params: Record<string,any>={})  {
    const r = await api.get<T[]>("/report/invoice",params,false)
        .then((v:ApiResponseInterface<T[]>)=>v.result);
    return r??[];
}
export async function getPaymentReport<T>(params: Record<string,any>={})  { const r = await api.get<T[]>("/report/payment",params,false).then((v:ApiResponseInterface<T[]>)=>v.result); return r??[]; }
export async function getStats<T>(params: Record<string,any>={})  { return await api.get<T>("/report/stats",params,false).then((v:ApiResponseInterface<T>)=>v.result as T); }
export async function getApplicantReport<T>(params: Record<string,any>={})  { const r = await api.get<T[]>("/report/applicants",params,false).then((v:ApiResponseInterface<T[]>)=>v.result); return r??[]; }
export async function getDiscountReport<T>(params: Record<string,any>={})  { const r = await api.get<T[]>("/report/discounts",params,false).then((v:ApiResponseInterface<T[]>)=>v.result); return r??[]; }
export async function getItemReport<T>(params: Record<string,any>={})  { const r = await api.get<T[]>("/report/item",params,false).then((v:ApiResponseInterface<T[]>)=>v.result); return r??[]; }
export async function exportApplicantReport(p: Record<string,any>={}) { dl(await api.getFile("/report/applicants/export",p),"laporan-pendaftar.xlsx"); }
export async function exportDiscountReport(p: Record<string,any>={}) { dl(await api.getFile("/report/discounts/export",p),"laporan-potongan.xlsx"); }
export async function exportItemReport(p: Record<string,any>={}) { dl(await api.getFile("/report/item/export",p),"laporan-tagihan-item.xlsx"); }
export async function exportInvoiceReport(p: Record<string,any>={}) { dl(await api.getFile("/report/invoice/export",p),"laporan-tagihan.xlsx"); }
export async function exportPaymentReport(p: Record<string,any>={}) { dl(await api.getFile("/report/payment/export",p),"laporan-pembayaran.xlsx"); }
