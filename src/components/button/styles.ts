import styled from "styled-components";

interface ButtonProps {
  color?: string;
  textColor?: string;
}

export const Button = styled.button<ButtonProps>`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 9.75rem;
  padding: 0.5625rem 1rem;
  border-radius: 1.125rem;

  background-color: ${({ color }) => (color ? color : 'blue')};
  color: ${({ textColor }) => (textColor ? textColor : '#FFFFFF')};

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    background-color: #E0E0E0;
    cursor: not-allowed;
  }
`