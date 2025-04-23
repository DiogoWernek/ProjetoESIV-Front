import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  
  display: flex;
`;

export const ContentArea = styled.div`
  width: 100%;
  padding: 3rem;
  overflow-y: auto;
  flex-direction: row;
  
  background-color: #f8f9fa;

  .header {
    display: flex;
    justify-content: space-between;
    
    .textHeader {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    p {
      font-size: 0.875rem;
      color: #9B9BA1;
    }
  }
  }

`;
