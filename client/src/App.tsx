import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AppLayout } from "./layouts/AppLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" />
      </Route>
    </Routes>
  )
}
