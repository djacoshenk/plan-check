import { AuthProvider } from "context/AuthProvider";

type AppProviderType = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderType) => {
  return <AuthProvider>{children}</AuthProvider>;
};
