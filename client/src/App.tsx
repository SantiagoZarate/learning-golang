import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { BaseLayout } from "./layouts/BaseLayout";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { HomePage } from "./pages/home/HomePage";
import { PublicPage } from "./pages/public/PublicPage";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { PrivatePage } from "./pages/private/PrivatePage";

export default function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} >
            <Route index element={<PublicPage />} />
            <Route path="/home/private" element={<ProtectedRoute />}>
              <Route index element={<PrivatePage />} />
            </Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<AuthPage />} />
            <Route path="register" element={<AuthPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
