import * as S from './styles';
import UserProfile from '../userProfile';
import { Users, ChartBar, Gear, House } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <S.Container>
      <UserProfile />

      <S.PagesContainer>
        <S.StyledNavLink to="/" $active={isActive('/')}>
          <House size={20} weight={isActive('/') ? 'fill' : 'regular'} />
          <span>Home</span>
        </S.StyledNavLink>

        <S.StyledNavLink to="/clientes" $active={isActive('/clientes')}>
          <Users size={20} weight={isActive('/clientes') ? 'fill' : 'regular'} />
          <span>Clientes</span>
        </S.StyledNavLink>

        <S.StyledNavLink to="/dashboard" $active={isActive('/dashboard')}>
          <ChartBar size={20} weight={isActive('/dashboard') ? 'fill' : 'regular'} />
          <span>Dashboard</span>
        </S.StyledNavLink>

        <S.StyledNavLink to="/configuracoes" $active={isActive('/configuracoes')}>
          <Gear size={20} weight={isActive('/configuracoes') ? 'fill' : 'regular'} />
          <span>Configurações</span>
        </S.StyledNavLink>
      </S.PagesContainer>

      <S.Footer>
        <p>Precisa de ajuda?</p>
        <a href="">Suporte</a>
      </S.Footer>
    </S.Container>
  );
};

export default SideBar;
