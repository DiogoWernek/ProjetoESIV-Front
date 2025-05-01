import styled from "styled-components";

interface cardClientProps {
  active?: boolean;
}

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
  })<cardClientProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 2px solid #e9ecef;
  border-radius: 1rem;

  h2 {
    font-size: 13px;
  }

  p {
    font-size: 0.8rem;
    color: #797981;
  }

  span {
    font-size: 0.8rem;
    padding: 0.3rem;
    padding-inline: 1rem;
    border-radius: 1rem;
    background-color: ${(props) => props.active === true ? "#D9F7E8" : "#F8D7DA"};
    color: ${(props) => props.active === true ? "#00773c" : "#b03d37"};
  }
`