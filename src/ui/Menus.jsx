import styled from "styled-components";

import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutesideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  return (
    <MenusContext.Provider value={{ openId, setOpenId, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, setOpenId, setPosition } = useContext(MenusContext);
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(rect, window.innerWidth);
    console.log(
      window.innerWidth - rect.x - rect.width,
      rect.y + rect.height + 8
    );

    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height,
    });
    if (openId === "" || openId !== id) {
      setOpenId(id);
    } else {
      setOpenId("");
    }
  }
  return (
    <StyledToggle onClick={handleClick}>{<HiEllipsisVertical />}</StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, setOpenId } = useContext(MenusContext);
  const { ref } = useOutsideClick(setOpenId);
  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { setOpenId } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    setOpenId("");
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
