/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../Auth/routes/AuthRoutes";
import { JournallRoutes } from "../journal/routes/JournallRoutes";
import { CheckingAuth } from "../ui/components/checkingAuth";
import { useCheckAuth } from "./hooks/useCheckAuth";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournallRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
      {/* login y registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* JournallApp */}
      {/* <Route path="/*" element={<JournallRoutes />} /> */}
    </Routes>
  );
};
