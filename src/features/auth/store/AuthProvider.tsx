import { type ReactNode, useEffect, useState } from "react";
import { apiCore } from "@/services/api";
import { profile as getProfile } from "@/features/auth/services/auth";
import { Loading } from "@/components";
import { AuthContext } from "@/hooks/useAuthContext";
import type { UserType } from "@/types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const api = new apiCore();
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | undefined>(undefined);

    useEffect(() => {
        const checkLogged = api.getLoggedInUser();
        const profile = async () => {
            try {
                await getProfile().then((resp) => {
                    setUser(resp);
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (checkLogged) {
            setIsLogged(true);
            profile();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <Loading />;

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};