import { type ReactNode, useEffect, useState } from "react";
import type { InstitutionType } from "@/types";
import { show as showInstitution } from "@/features/institution/services/institution";
import { InstitutionContext } from "@/hooks/useInstitutionContext";
import { Loading } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ROLE_INSTITUTION } from "@/constants";

export const InstitutionProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [institution, setInstitution] = useState<InstitutionType>();

    useEffect(() => {
        const fetchInstitution = async () => {
            setLoading(true);
            try {
                if (user?.role && ROLE_INSTITUTION.includes(user.role)) {
                    await showInstitution({ id: user?.institutionId }).then((resp) => {
                        setInstitution(resp);
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchInstitution();
        else setLoading(false);
    }, [user]);

    if (loading) return <Loading />;

    return (
        <InstitutionContext.Provider value={institution}>
            {children}
        </InstitutionContext.Provider>
    );
};