import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

type AuthContextType = {
  currentUser: string | null;
  signIn: (id: string) => void;
  signOut: () => void;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const currentUserStorage = localStorage.getItem("current_user");

    if (currentUserStorage) {
      setCurrentUser(currentUserStorage);
    }
  }, []);

  const signIn = (id: string) => {
    setCurrentUser(id);
    history.push(`/user/${id}`);
  };

  const signOut = () => {
    setCurrentUser(null);
    history.push("/signin");
  };

  const value = { currentUser, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
