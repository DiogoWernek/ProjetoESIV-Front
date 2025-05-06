import { BrowserRouter } from "react-router";
import { MyRoutes } from "./MyRoutes";

export function MainRoutes() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}