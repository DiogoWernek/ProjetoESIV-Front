import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  
  gap: 0.5rem;
  display: flex;

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

export const UserName = styled.div`

  p {
    color: #FFFFFF;
    font-size: 1rem;
  }
`