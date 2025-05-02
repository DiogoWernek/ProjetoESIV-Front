import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`

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

  .texts-clients {
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    p {
      font-size: 0.875rem;
      color: #9B9BA1;
    }
  }
`