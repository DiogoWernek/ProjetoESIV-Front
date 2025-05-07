import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

interface ContentAreaProps {
  closed: "open" | "closed";
}

export const ContentArea = styled.div<ContentAreaProps>`
  margin-left: ${(props) => (props.closed === "closed" ? "4rem" : "15rem")};
  width: ${(props) =>
    props.closed === "closed" ? "calc(100% - 4rem)" : "calc(100% - 15rem)"};
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

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 85%;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 22rem;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 1rem;

  button {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: #f1f1f1;
    cursor: pointer;

    &.active {
      background: #2962ff;
      color: white;
    }
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .radio-group {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;

    &:active {
      border: 1px solid #2962ff;
    }

    &:focus-within {
      background-color: #fafcff;
      border: 1px solid #2962ff;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  margin-bottom: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const StatusSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .switch-container {
    padding: 1.5rem 1rem;
    border-radius: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #e9e9e9;

    p {
      font-size: 0.8rem;
      color: #797981;
    }

    span {
      font-weight: 700;
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      border-radius: 24px;
      transition: 0.4s;

      &:before {
        content: "";
        position: absolute;
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
      }
    }

    input:checked + .slider {
      background-color: #2962ff;
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }
  }
`;

export const Button = styled.button`
  background: #2962ff;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  align-self: flex-end;
  cursor: pointer;
`;
