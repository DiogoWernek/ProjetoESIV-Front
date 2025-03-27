import styled from "styled-components";

interface sidebarStatusProps {
  closed: boolean;
}

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'closed'
})<sidebarStatusProps>`
  padding: 1rem;
  
  gap: 0.5rem;
  display: flex;
  opacity: ${(props) => (props.closed ? '0' : '1')};
  transition: ${(props) => ((props.closed == true) ? '0' : 'opacity 1s 0.2s')};

  .user-photo {
    width: 1.875rem;
    height: 1.875rem;
    padding: 0.625rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.5rem;
    background-color: #FFFFFF;

    p {
      color: #2662D9;
      font-size: 1.2rem;
    }
  }
`

export const UserName = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'closed'
})<sidebarStatusProps>`

  p {
    color: #FFFFFF;
    white-space: nowrap;
    font-size: ${(props) => (props.closed ? '0' : '1rem')};
  }
`