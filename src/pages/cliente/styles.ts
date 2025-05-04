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
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;

  .back-button {
    gap: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    a {
      cursor: pointer;
    }
  }
`