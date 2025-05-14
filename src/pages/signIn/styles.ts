import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f6f8;

  @media (max-width: 500px) {
    padding: 0 0.6rem;
  }
`;

export const FormCard = styled.form`
  background: #fff;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;

  h1 {
    font-size: 1.8rem;
    text-align: center;
    color: #333;
  }

  input {
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem;
    background-color: #2962ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background-color: #0039cb;
    }
  }

  span {
    text-align: center;
    color: #2962ff;
    cursor: pointer;
    font-size: 0.95rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;
