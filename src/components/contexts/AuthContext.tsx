import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../interfaces/user";
import { getMyProfile } from "../services/profile.service";

interface TokenDecodingType {
  user: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;

}
interface AuthContextType {
  userToken: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  saveUserToken: (token: string) => void;
  removeUserToken: () => void;
  currentUserInfo: User | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = useState<null | string>(
    () => localStorage.getItem('userToken')
  );
  const isAuthenticated = Boolean(userToken);

  const [userId, setUserId] = useState<null | string>(null);
  const [currentUserInfo, setCurrentUserInfo] = useState<User | undefined>(undefined);

  function saveUserToken(token: string): void {
    setUserToken(token);
    localStorage.setItem("userToken", token);
  }
  function removeUserToken(): void {
    setUserToken(null);
    localStorage.removeItem("userToken");
  }

  const { data } = useQuery({
    queryKey: ["getMyProfile", userId],
    queryFn: () => getMyProfile(userToken!),
  })
  const userData = data?.data.data.user;


  useEffect(() => {
    if(userToken){

      const { user } = jwtDecode<TokenDecodingType>(userToken);
      setUserId(user);
    }

  }, [])

  useEffect(() => {
    if (data) {
      setCurrentUserInfo(userData);

    }
  }, [data])

  return (
    <AuthContext.Provider value={{ userToken, userId, currentUserInfo, isAuthenticated, saveUserToken, removeUserToken }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  return context!;
}