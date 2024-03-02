import React, { useEffect } from "react";
import { TModalOverlayProps } from "../../types/types";
import styles from "./ModalOverlay.module.css";

const ModalOverlay: React.FC<TModalOverlayProps> = ({ onClose }) => {
  const closeByOverlay = (evt: React.MouseEvent) => {
    const target = evt.target as HTMLDivElement;
    if (target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  useEffect(() => {
    const closeByEsc = (evt: KeyboardEvent | React.KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [onClose]);

  return <div onClick={closeByOverlay} className={styles.overlay} />;
};

export default ModalOverlay;
