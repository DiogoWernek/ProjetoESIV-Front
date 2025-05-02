import styled from "styled-components";

interface ButtonProps {
  color?: string;
  textColor?: string;
  border?: string;
  rounded?: boolean;
  fs?: string;
}

export const Button = styled.button<ButtonProps>`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5625rem 1rem;
  border-radius: 1.125rem;
  border-radius: ${({ rounded }) => (rounded ? '1.125rem' : '8px')};

  background-color: ${({ color }) => (color ? color : 'blue')};
  color: ${({ textColor }) => (textColor ? textColor : '#FFFFFF')};
  border: 2px solid ${({ border }) => (border ? border : 'transparent')};
  border-color: ${({ border }) => (border ? border : '')};
  font-size: ${({ fs }) => (fs ? fs : '1rem')};

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    background-color: #E0E0E0;
    cursor: not-allowed;
  }
`