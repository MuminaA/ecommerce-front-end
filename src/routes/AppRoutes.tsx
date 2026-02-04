import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { AdminRoutes } from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {AdminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}