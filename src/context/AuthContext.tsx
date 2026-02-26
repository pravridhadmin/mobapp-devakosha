import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


// =======================
// 1️⃣ Types
// =======================

export interface User {
  mobile: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (mobile: string) => Promise<void>;
  logout: () => Promise<void>;
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
        console.error("Failed to save user", e);
      }

      setIsLoading(false);
    }, 1000);
  };

  // =======================
  // Logout
  // =======================

  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.error("Failed to remove user", e);
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
      console.error("Login check error", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};