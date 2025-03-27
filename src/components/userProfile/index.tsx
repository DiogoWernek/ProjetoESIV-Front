import { useState, useEffect } from "react";
import * as S from "./styles";

interface SidebarStatus {
  closed: string;
}

const UserProfile = ({ closed }: SidebarStatus) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (closed === "closed") {
      const timer = setTimeout(() => {
        setShow(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [closed]);

  return (
    <div style={{ position: "relative" }}>
      <S.Container closed={closed === "closed"}>
        <div className="user-photo">
          <p>D</p>
        </div>
        <S.UserName closed={closed === "closed"}>
          <p>Deividi Costinha</p>
        </S.UserName>
      </S.Container>

      {closed === "closed" && (
        <p
          style={{
            padding: "0.3rem 0.5rem",
            borderRadius: "999px",
            position: "absolute",
            backgroundColor: "white",
            top: "10px",
            right: "31%",
            color: "#2662D9",
            opacity: show ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          D
        </p>
      )}
    </div>
  );
};

export default UserProfile;
