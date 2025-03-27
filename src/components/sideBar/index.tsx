import * as S from "./styles";
import UserProfile from "../userProfile";
import { Users, Gear, House, ArrowLeft } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const SideBar = () => {
  const location = useLocation();
  const [closed, setClosed] = useState<"closed" | "open">("open");

  const toggleSidebar = () => {
    setClosed((prev) => (prev === "open" ? "closed" : "open"));
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <S.Container closed={closed === "closed"}>
      <S.ToggleButton onClick={toggleSidebar} closed={closed === "closed"}>
        <ArrowLeft size={24} />
      </S.ToggleButton>

      <UserProfile closed={closed} />

      <S.PagesContainer>
        <S.StyledNavLink to="/" $active={isActive("/")}>
          <House size={20} weight={isActive("/") ? "fill" : "regular"} />
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

      <S.Footer>
        {closed === "open" ? (
          <>
            <p>Precisa de ajuda?</p>
            <a href="/suporte">Suporte</a>
          </>
        ) : (
          <></>
        )}
      </S.Footer>
    </S.Container>
  );
};

export default SideBar;
