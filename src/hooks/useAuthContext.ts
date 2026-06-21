import { createContext, use, type Dispatch, type SetStateAction } from 'react';
import type { UserType } from '@/types';

interface AuthContextInterface {
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
    user: UserType | undefined;
    setUser: Dispatch<SetStateAction<UserType | undefined>>;
}

const INIT: AuthContextInterface = {
    isLogged: false,
    setIsLogged: () => undefined,
    user: undefined,
    setUser: () => undefined,
};

export const AuthContext = createContext<AuthContextInterface>(INIT);

export function useAuthContext() {
    const context = use(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContext');
    }
    return context;
}
