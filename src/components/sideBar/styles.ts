import styled from "styled-components";
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 15rem;
  padding: 1.5rem 0;
  
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  background-color: #2662D9;
  justify-content: space-between;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 4.5rem;
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

  span {
    
    @media (max-width: 768px) {
      display: none;
    }
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Footer = styled.div`
  padding: 1rem;
  
  color: white;
  text-align: center;
  font-size: 0.875rem;
  padding-bottom: 3rem;
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