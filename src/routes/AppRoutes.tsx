import React, { useEffect, type ReactNode } from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import ThemeProvider from "@/components/layout/provider/theme";
import { NoSidebar, WithSidebar } from "@/components/layout";
import Dashboard from "@/features/dashboard/pages";
import PrivateRoute from "@/routes/PrivateRoute";
import Login from "@/features/auth/pages/login";
import Register from "@/features/auth/pages/register";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "@/features/auth/pages/forget-password";
import Year from "@/features/master/pages/year";
import InstitutionList from "@/features/institution/pages/list";
import InstitutionDetails from "@/features/institution/pages/detail";
import Logout from "@/features/auth/pages/logout";
import Error404 from "@/features/error/pages/error404";
import Boarding from "@/features/master/pages/boarding";
import Room from "@/features/master/pages/room";
import PhoneVerification from "@/features/auth/pages/phone-verification";
import Payment from "@/features/payment/pages/index";
import PaymentDetail from "@/features/payment/pages/detail";
import Product from "@/features/master/pages/product";
import AdminRoute from "@/routes/AdminRoute";
import OperatorRoute from "@/routes/OperatorRoute";
import User from "@/features/user/pages";
import StudentPersonal from "@/features/student/pages/register/partials/personal";
import StudentParent from "@/features/student/pages/register/partials/parent";
import StudentAddress from "@/features/student/pages/register/partials/address";
import StudentProgram from "@/features/student/pages/register/partials/program";
import StudentOrigin from "@/features/student/pages/register/partials/origin";
import StudentAchievement from "@/features/student/pages/register/partials/achievement";
import StudentFile from "@/features/student/pages/register/file";
import Student from "@/features/student/pages";
import Invoice from "@/features/invoice/pages";
import InvoiceDetail from "@/features/invoice/pages/detail";
import InvoicePrint from "@/features/invoice/pages/print";
import Print from "@/features/student/pages/print";
import InvoiceReportStudent from "@/features/report/components/invoiceStudent.tsx";
import PaymentReport from "@/features/report/components/payment.tsx";
import ApplicantsReport from "@/features/report/components/applicants.tsx";
import DiscountsReport from "@/features/report/components/discounts.tsx";
import Institution from "@/features/institution/pages";
import InstitutionActivity from "@/features/institution/pages/activity";
import GuestRules from "@/features/guest/pages/rules";
import GuestSchedule from "@/features/guest/pages/schedule";
import GuestFlow from "@/features/guest/pages/flow";
import InstitutionProgram from "@/features/institution/pages/program";
import InstitutionPeriod from "@/features/institution/pages/period";
import StudentAdd from "@/features/student/pages/add";
import PaymentSettings from "@/features/payment/pages/settings";
import MasterRules from "@/features/master/pages/rules";
import InstitutionRules from "@/features/institution/pages/rules";
import VerifyReceipt from "@/features/guest/pages/verify/verify-receipt";
import VerifyRegistration from "@/features/guest/pages/verify/[token]";
import StudentBoardingPrint from "@/features/student/pages/print-boarding";
import InvoiceReportPrint from "@/features/report/components/invoice-print.tsx";
import PaymentReportPrint from "@/features/report/components/payment-print.tsx";
import ApplicantsReportPrint from "@/features/report/components/applicants-print.tsx";
import DiscountsReportPrint from "@/features/report/components/discounts-print.tsx";
import InvoiceItemReportPrint from "@/features/report/components/invoice-item-print.tsx";
import SystemLog from "@/features/dashboard/pages/log";
import IntegrationTest from "@/features/dashboard/pages/test";
import AnnouncementPage from "@/features/announcement/pages";
import Whatsapp from "@/features/setting/pages/whatsapp";
import InvoiceReportItem from "@/features/report/components/invoiceItem.tsx";
import Cashflow from "@/features/cashflow/pages";
import Transaction from "@/features/cashflow/pages/transaction";

interface ScrollToTopProps {
    children: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route element={<ThemeProvider />}>
                        <Route element={<WithSidebar />}>
                            <Route element={<PrivateRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route element={<AdminRoute roles={[1]} />}>
                                    <Route path="/log-sistem" element={<SystemLog />} />
                                    <Route path="/test-integrasi" element={<IntegrationTest />} />
                                </Route>
                                <Route element={<AdminRoute roles={[1, 2]} />}>
                                    <Route path="/data-pengguna" element={<User />} />
                                    <Route path="/pengumuman" element={<AnnouncementPage />} />
                                    <Route path="/pengaturan/whatsapp" element={<Whatsapp />} />
                                </Route>
                                <Route element={<OperatorRoute />}>
                                    <Route path="/master-data/program-lembaga" element={<InstitutionProgram />} />
                                    <Route path="/master-data/aktifitas-lembaga" element={<InstitutionActivity />} />
                                    <Route path="/master-data/aturan-lembaga" element={<InstitutionRules />} />
                                    <Route path="/master-data/periode-pendaftaran" element={<InstitutionPeriod />} />
                                    <Route path="/data-lembaga" element={<Institution />} />
                                    <Route path="/data-pendaftar/tambah" element={<StudentAdd />} />
                                    <Route path="/data-pendaftar/:id/ubah" element={<StudentAdd />} />
                                    <Route path="/data-pengguna" element={<User />} />
                                </Route>
                                <Route path="/master-data/tahun-pelajaran" element={<Year />} />
                                <Route path="/master-data/program-ponpes" element={<Boarding />} />
                                <Route path="/master-data/data-kamar" element={<Room />} />
                                <Route path="/master-data/item-pembayaran" element={<Product />} />
                                <Route path="/master-data/aturan-umum" element={<MasterRules />} />
                                <Route path="/master-data/konfigurasi-pembayaran" element={<PaymentSettings />} />
                                <Route path="/lembaga/:id/detail" element={<InstitutionDetails />} />
                                <Route path="/lembaga/data-lembaga" element={<InstitutionList />} />
                                <Route path="/pendaftaran/data-pribadi" element={<StudentPersonal />} />
                                <Route path="/pendaftaran/data-orangtua" element={<StudentParent />} />
                                <Route path="/pendaftaran/data-tempat-tinggal" element={<StudentAddress />} />
                                <Route path="/pendaftaran/program-pilihan" element={<StudentProgram />} />
                                <Route path="/pendaftaran/data-sekolah-asal" element={<StudentOrigin />} />
                                <Route path="/pendaftaran/data-prestasi" element={<StudentAchievement />} />
                                <Route path="/pendaftaran/unggah-berkas" element={<StudentFile />} />
                                <Route path="/data-pendaftar" element={<Student />} />
                                <Route path="/data-tagihan" element={<Invoice />} />
                                <Route path="/data-tagihan/:id/lihat" element={<InvoiceDetail />} />
                                <Route path="/pembayaran" element={<Payment />} />
                                <Route path="/pembayaran/:id/lihat" element={<PaymentDetail />} />
                                <Route path="/arus-kas" element={<Cashflow />} />
                                <Route path="/cetak-kartu" element={<Print />} />
                                <Route path="/laporan/tagihan/siswa" element={<InvoiceReportStudent />} />
                                <Route path="/laporan/tagihan/item" element={<InvoiceReportItem />} />
                                <Route path="/laporan/pembayaran" element={<PaymentReport />} />
                                <Route path="/laporan/pendaftar" element={<ApplicantsReport />} />
                                <Route path="/laporan/potongan" element={<DiscountsReport />} />
                                <Route path="/transaksi" element={<Transaction />} />
                            </Route>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/aturan-prosedur" element={<GuestRules />} />
                            <Route path="/jadwal-pelaksanaan" element={<GuestSchedule />} />
                            <Route path="/alur-pelaksanaan" element={<GuestFlow />} />
                        </Route>
                        <Route element={<NoSidebar />}>
                            <Route path="/auth/masuk" element={<Login />} />
                            <Route path="/auth/buat-akun" element={<Register />} />
                            <Route path="/auth/lupa-sandi" element={<ForgetPassword />} />
                            <Route path="/auth/verifikasi" element={<PhoneVerification />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="/auth/keluar" element={<Logout />} />
                            </Route>
                            <Route path="/error/403" element={<Error404 />} />
                            <Route path="/data-tagihan/:id/cetak" element={<InvoicePrint />} />
                            <Route path="/laporan/boarding/cetak" element={<StudentBoardingPrint />} />
                            <Route path="/laporan/tagihan/cetak" element={<InvoiceReportPrint />} />
                            <Route path="/laporan/tagihan-item/cetak" element={<InvoiceItemReportPrint />} />
                            <Route path="/laporan/pembayaran/cetak" element={<PaymentReportPrint />} />
                            <Route path="/laporan/pendaftar/cetak" element={<ApplicantsReportPrint />} />
                            <Route path="/laporan/potongan/cetak" element={<DiscountsReportPrint />} />
                            <Route path="/verify-receipt/:token" element={<VerifyReceipt />} />
                            <Route path="/verify/:token" element={<VerifyRegistration />} />
                            <Route path="*" element={<Error404 />} />
                        </Route>
                    </Route>
                </Routes>
            </ScrollToTop>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default AppRoutes;