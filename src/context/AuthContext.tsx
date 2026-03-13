import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth, { getAuth, signOut } from '@react-native-firebase/auth';
import { User } from "../types/models";
import { useFilters } from "./FiltersContext";



interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signin: (mobile: string) => Promise<void>;
    signout: () => Promise<void>;
}

// =======================
// 2️⃣ Create Context
// =======================

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);


// =======================
// 3️⃣ Provider Props
// =======================

interface AuthProviderProps {
    children: ReactNode;
}


// =======================
// 4️⃣ Provider Component
// =======================

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // =======================
    // signin
    // =======================

    const signin = async (mobile: string): Promise<void> => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(async () => {
            const userData: User = {
                mobile,
            };

            setUser(userData);

            try {
                await AsyncStorage.setItem("user", JSON.stringify(userData));
            } catch (e) {
                throw e;
            }

            setIsLoading(false);
        }, 1000);
    };

    // =======================
    // signout
    // =======================

    const { setFilters } = useFilters();
    const signout = async (): Promise<void> => {
        setIsLoading(true);

        try {
             const auth = getAuth();
                await signOut(auth);
            await AsyncStorage.removeItem("user");
            setFilters({
            search: "",
            state: null,
            district: null,
        });
        setUser(null);
        } catch (e) {
            throw e;
        }

        setIsLoading(false);
    };

    // =======================
    // Check Persisted signin
    // =======================

    const checkSigninStatus = async (): Promise<void> => {
        try {
            setIsLoading(true);

            const storedUser = await AsyncStorage.getItem("user");

            if (storedUser) {
                setUser(JSON.parse(storedUser) as User);
            }
        } catch (e) {
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkSigninStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ signin, signout, isLoading, user }}>
            {children}
        </AuthContext.Provider>
    );
};