import { useModalContext } from "../../context/ModalContext";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

export default function Modal({ children }) {
  const { setIsOpenModal } = useModalContext();
  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeModal}
          onClick={() => setIsOpenModal(false)}
        >
          <IoCloseOutline />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
