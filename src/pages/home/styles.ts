import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  display: flex;
`;

interface ContentAreaProps {
  closed: "open" | "closed";
}

export const ContentArea = styled.div<ContentAreaProps>`
  margin-left: ${(props) => (props.closed === "closed" ? "4rem" : "15rem")};
  width: ${(props) => (props.closed === "closed" ? "calc(100% - 4rem)" : "calc(100% - 15rem)")};
  transition: margin-left 0.3s ease, width 0.3s ease;
  
  height: 100%;
  padding-block: 3rem;
  overflow-y: auto;
  flex-direction: row;
  display: flex;
  justify-content: center;
  
  background-color: #f8f9fa;

  .wrapper {
    width: 100%;
    max-width: 85%;
  }
  
  .cards {
    gap: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
    margin-top: 2rem;
  }

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

  .clients {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    background-color: #fff;
    box-shadow: #00000029 4px 4px 14px 0px;
    border-radius: 1rem;
    padding: 2rem;

    .texts-clients {
      h2 {
        font-size: 1rem;
      }

      p {
        font-size: 0.8rem;
        color: #797981;
      }
    }

    .cards-clients {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(31rem, 2fr));

      @media (max-width: 900px) {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
