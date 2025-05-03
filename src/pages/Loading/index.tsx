import { useState } from "react";
import SideBar from "../../components/sideBar";

export function Loading() {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <SideBar closed={sidebarClosed} setClosed={setSidebarClosed} />

      <h1 style={{ marginLeft: "50%", marginTop: "20%" }}>Carregando...</h1>
    </div>
  )
}