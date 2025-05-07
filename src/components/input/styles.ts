import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.875rem;
    color: #5c5c5c;
    font-weight: 700;
  }

  input {
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
`;
