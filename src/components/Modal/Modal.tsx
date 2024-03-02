import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { createPortal } from "react-dom";
import { IModalProps } from "../../types/types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import cn from "classnames";

const modals = document.getElementById("modals") as HTMLElement;

const Modal: React.FC<IModalProps> = ({ children, onClose, title }) =>
  createPortal(
    <>
      <div className={styles.content}>
        <div className={styles.container}>
          <h2 className={cn("text text_type_main-large mt-0 mb-0", styles.title)}>{title}</h2>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modals
  );

export default Modal;
