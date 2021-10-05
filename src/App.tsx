import { AppProvider } from "context/AppProvider";
import { Routes } from "routes/Routes";

export const App = () => {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};
