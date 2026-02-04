import { Routes, Route } from "react-router-dom";
import { publicRoutes} from "./publicRoutes";
import { adminRoutes } from "./adminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {adminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}