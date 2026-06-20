import AppRoutes from "@/routes/AppRoutes";
import { YearProvider } from "@/features/master/store/YearProvider";
import { AuthProvider } from "@/features/auth/store/AuthProvider";
import { InstitutionProvider } from "@/features/institution/store/InstitutionProvider";

const App = () => {
    return (
        <YearProvider>
            <AuthProvider>
                <InstitutionProvider>
                    <AppRoutes />
                </InstitutionProvider>
            </AuthProvider>
        </YearProvider>
    );
};

export default App;