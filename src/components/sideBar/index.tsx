import * as S from "./styles";
import UserProfile from "../userProfile";
import { Users, Gear, House, ArrowLeft, List } from "@phosphor-icons/react";
import { useLocation } from "react-router";

interface SideBarProps {
  closed: "open" | "closed";
  setClosed: React.Dispatch<React.SetStateAction<"open" | "closed">>;
}

import { useEffect } from "react";

const SideBar = ({ closed, setClosed }: SideBarProps) => {
  const location = useLocation();

  const toggleSidebar = () => {
    setClosed((prev) => (prev === "open" ? "closed" : "open"));
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setClosed("closed");
      }
    };

    handleMediaChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [setClosed]);


  return (
    <>
      {/* Botão que aparece só no mobile quando o sidebar está fechado */}
      {closed === "closed" && (
        <S.MobileToggle onClick={toggleSidebar}>
          <List size={24} color="white" />
        </S.MobileToggle>
      )}


      <S.Container closed={closed === "closed"}>
        <S.ToggleButton onClick={toggleSidebar} closed={closed === "closed"}>
          <ArrowLeft size={24} />
        </S.ToggleButton>

        <UserProfile closed={closed} />

        <S.PagesContainer>
          <S.StyledNavLink to="/dashboard" $active={isActive("/dashboard")}>
            <House size={20} weight={isActive("/dashboard") ? "fill" : "regular"} />
            {closed === "open" && <span>Home</span>}
          </S.StyledNavLink>

          <S.StyledNavLink to="/clientes" $active={isActive("/clientes")}>
            <Users
              size={20}
              weight={isActive("/clientes") ? "fill" : "regular"}
            />
            {closed === "open" && <span>Clientes</span>}
          </S.StyledNavLink>

          <S.StyledNavLink
            to="/configuracoes"
            $active={isActive("/configuracoes")}
          >
            <Gear
              size={20}
              weight={isActive("/configuracoes") ? "fill" : "regular"}
            />
            {closed === "open" && <span>Configurações</span>}
          </S.StyledNavLink>
        </S.PagesContainer>

        <div style={{ display: 'flex', flexDirection: "column", gap: "1rem", padding: "0 0.75rem", marginBottom: "0.5rem" }}>
          {closed === "open" && (
            <S.LogoutButton onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}>
              Sair
            </S.LogoutButton>
          )}
        </div>

        <S.Footer>
          {closed === "open" && (
            <>
              <p>Precisa de ajuda?</p>
              <a href="/suporte">Suporte</a>
            </>
          )}
        </S.Footer>
      </S.Container>
    </>
  );
};


export default SideBar;
