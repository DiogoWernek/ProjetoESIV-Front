import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;

  input {
    all: unset;
    flex: 1;

    &::placeholder { 
      font-size: 0.8rem;
    }
  }

  .input {
    border-radius: 0.5rem;
    background-color: #f8f9fa;
    gap: 0.5rem;
    padding: 0.5rem;
    align-items: center;
    display: flex;
    border: 2px solid transparent;
  }

  .input:focus-within {
    border-color: #2662D9;
  }
`;
