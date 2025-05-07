import { Route, Routes } from "react-router";
import Home from "../pages/home";
import NotFound from "../pages/error404";
import { Clients } from "../pages/clients";
import { Cliente } from "../pages/cliente";
import { NewClient } from "../pages/newClient";
import { SignIn } from "../pages/signIn";
import { SignUp } from "../pages/signUp";
import { Configuracoes } from "../pages/configs";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/clientes" element={<Clients />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/cliente/:id" element={<Cliente />} />
      <Route path="/novo-cliente" element={<NewClient />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      
      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}