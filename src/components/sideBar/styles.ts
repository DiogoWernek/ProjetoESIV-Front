import styled from "styled-components";
import { NavLink } from 'react-router';

interface sidebarStatusProps {
  closed: boolean;
}

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'closed'
})<sidebarStatusProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  max-width: ${(props) => (props.closed ? '4rem' : '15rem')};
  background-color: #2662D9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, max-width 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;

  @media (max-width: 900px) {
    max-width: 15rem;
    transform: ${(props) => (props.closed ? 'translateX(-100%)' : 'translateX(0)')};
  }
`;

export const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'closed'
})<sidebarStatusProps>`
  all: unset;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #245BCB;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  svg {
    transform: ${(props) => (props.closed ? 'rotate(180deg)' : 'rotate(0)')};
    transition: transform 0.2s;
  }

  &:hover {
    filter: brightness(105%);
  }
`;

export const PagesContainer = styled.div`
  padding: 0 0.75rem;
  gap: 0.5rem;
  flex-grow: 1;
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
`;

export const StyledNavLink = styled(NavLink)<{ $active?: boolean }>`
  all: unset;
  
  width: 100%;
  padding: 0.75rem 1rem;
  
  gap: 0.75rem;
  display: flex;
  cursor: pointer;
  border-radius: 0.375rem;
  align-items: center;
  
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.8);
  
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  ${props => props.$active && `
    color: white;
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.15);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3px;
      background-color: white;
      border-radius: 0 3px 3px 0;
    }
  `}

  svg {
    flex-shrink: 0;
  }
`;

export const Footer = styled.div`
  padding: 1rem;
  
  color: white;
  text-align: center;
  font-size: 0.875rem;
  padding-bottom: 2rem;
  background-color: #245BCB;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  p {
    margin-bottom: 1rem;
  }

  a {
    all: unset;
    padding-inline: 3rem;
    padding-block: 0.5rem;
    border-radius: 0.5rem;
    
    margin-bottom: 1rem;
    
    cursor: pointer;
    color: #FFFFFF;
    background-color: #507CD5;
    
    &:hover {
      filter: brightness(105%);
    }
  }
`;

export const LogoutButton = styled.button`
  all: unset;
  cursor: pointer;
  color: #ffffff;
  background-color: #D93E3E;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin: 1rem;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b53232;
  }
`;

export const MobileToggle = styled.button`
  all: unset;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background-color: #2662D9;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg rect {
    transition: fill 0.2s;
  }

  &:hover svg rect {
    fill: #ddd;
  }
`;
