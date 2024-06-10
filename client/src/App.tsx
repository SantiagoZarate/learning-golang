import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AppLayout } from "./layouts/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { AuthLayout } from "./layouts/AuthLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
