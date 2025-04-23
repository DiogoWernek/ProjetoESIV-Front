import { BrowserRouter } from "react-router";
import { MyRoutes } from "./myRoutes";

export function MainRoutes() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}