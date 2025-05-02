import { Route, Routes } from "react-router";
import Home from "../pages/home";
import NotFound from "../pages/error404";
import { Clients } from "../pages/clients";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clients />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/configuracoes" element={<Home />} />
      
      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}