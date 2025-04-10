import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import Button from "./Button";
import { useOutsideClick } from "../hooks/useOutesideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  return (
    <ModalContext.Provider value={{ openName, setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: opensWinsowName }) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      setOpenName(opensWinsowName);
    },
    $size: children.props.$size || "medium",
    $variation: children.props.$variation || "primary",
  });
}
function Window({ children, name }) {
  const { openName, setOpenName } = useContext(ModalContext);
  const { ref } = useOutsideClick(setOpenName);

  if (name !== openName) {
    return null;
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => setOpenName("")}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, { onCloseModal: () => setOpenName("") })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;
