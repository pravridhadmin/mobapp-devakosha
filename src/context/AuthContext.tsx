import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import { User } from "../types/models";
import { useLocationFilters } from "../hooks/useLocationFilters";
import { useFilters } from "./FiltersContext";



interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (mobile: string) => Promise<void>;
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
    // Login
    // =======================

    const login = async (mobile: string): Promise<void> => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(async () => {
            const userData: User = {
                mobile,
                token: "dummy-token",
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
            await auth().signOut();
            await AsyncStorage.removeItem("user");
            setFilters({
            search: "",
            state: null,
            district: null,
        });
        } catch (e) {
            throw e;
        }

        setUser(null);
        setIsLoading(false);
    };

    // =======================
    // Check Persisted Login
    // =======================

    const checkLoginStatus = async (): Promise<void> => {
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
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ login, signout, isLoading, user }}>
            {children}
        </AuthContext.Provider>
    );
};