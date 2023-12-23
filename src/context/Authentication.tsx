import { checkTokensValidation } from "@/store/slices/checkUnique/slice";
import { AppDispatch, RootState } from "@/store/store";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AuthenticationType {
  isAuthenticated: boolean | null;
  logout: () => void;
}

const initialData: AuthenticationType = {
  isAuthenticated: null,
  logout: () => {},
};

export const AuthenticationContext = createContext(initialData);

export default function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { isTokenValid, isLoading } = useSelector(
    (state: RootState) => state.checkUnique
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("user-account-token");

    if (!token) return setIsAuthenticated(false);

    dispatch(checkTokensValidation(token));
  }, []);

  useEffect(() => {
    if (isTokenValid) setIsAuthenticated(true);
    else if (isTokenValid === false) {
      setIsAuthenticated(false);
      localStorage.removeItem("user-account-token");
    }
  }, [isTokenValid, isLoading]);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const AuthContext = () => useContext(AuthenticationContext);
