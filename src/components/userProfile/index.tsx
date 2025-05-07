import { useState, useEffect } from "react";
import * as S from "./styles";

interface SidebarStatus {
  closed: string;
}

const UserProfile = ({ closed }: SidebarStatus) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [initial, setInitial] = useState(name.charAt(0).toUpperCase() || "C");

  // Atualiza nome e inicial quando o localStorage muda
  useEffect(() => {
    const updateName = () => {
      const storedName = localStorage.getItem("name") || "";
      setName(storedName);
      setInitial(storedName.charAt(0).toUpperCase() || "C");
    };

    // Atualiza se mudar em outra aba
    window.addEventListener("storage", updateName);

    // Verifica mudanças locais (como ao atualizar nas configurações)
    const interval = setInterval(() => {
      if (localStorage.getItem("name") !== name) {
        updateName();
      }
    }, 1000); // verifica a cada segundo

    return () => {
      window.removeEventListener("storage", updateName);
      clearInterval(interval);
    };
  }, [name]);

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
          <p>{initial}</p>
        </div>
        <S.UserName closed={closed === "closed"}>
          <p>{name}</p>
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
          {initial}
        </p>
      )}
    </div>
  );
};

export default UserProfile;
