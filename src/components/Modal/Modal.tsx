'use client'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import { IModalProps } from "../../types/types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

// const modals = document.getElementById("modals") as HTMLElement;

const Modal: React.FC<IModalProps> = ({ children, onClose, title }) => {

  let container;
  if (typeof window !== 'undefined') {
    container = document.getElementById("modals") as HTMLElement;
  }

  return  createPortal(
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
  // @ts-ignore
  container
)};

export default Modal;
