import { Toaster } from "sonner";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

export const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
      <Toaster richColors />
    </>
  );
};
