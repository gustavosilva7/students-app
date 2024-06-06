import { useApi } from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

type Auth = {
  token: string;
  setAuthToken: (token: string) => void;
  currentUser?: any;
  setCurrentUser: (user: any) => void;
};

const initialValues: Auth = {
  token: "",
  setAuthToken: () => {},
  currentUser: null,
  setCurrentUser: () => {},
};

const AuthContext = React.createContext<Auth>(initialValues);

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("Erro");
  }
  return context;
};

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = React.useState<string>("");
  const [currentUser, setUser] = React.useState<any>(null);

  const setAuthToken = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setToken(token);
  };

  const setCurrentUser = async (user: any) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  React.useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setAuthToken, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, setCurrentUser } = useAuth();
  const { getUser } = useApi();

  React.useEffect(() => {
    const requestUser = async () => {
      try {
        const user = await getUser();
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      requestUser();
    }
  }, [token]);

  return <>{children}</>;
};

export { AuthContext, AuthProvider, AuthInit, useAuth };
