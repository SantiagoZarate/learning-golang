import { Route, Routes } from "react-router-dom";
import { BaseLayout, AppLayout, AuthLayout } from "./layouts";
import { LandingPage, HomePage, AuthPage } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<AuthPage />} />
            <Route path="register" element={<AuthPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
