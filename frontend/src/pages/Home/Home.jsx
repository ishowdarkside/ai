/* eslint-disable react/no-unescaped-entities */
import { useModalContext } from "../../context/ModalContext";
import Sidebar from "../../features/sidebar/Sidebar";
import UploudLayout from "../../features/uploadLayout/UploudLayout";
import Modal from "../../utilities/Modal/Modal";
import Navbar from "../../utilities/Navbar/Navbar";
import styles from "./Home.module.scss";
import { useDeleteFolder } from "../../hooks/useFolders";

export default function Home() {
  const { isOpenModal, setIsOpenModal, selectedFolder, setSelectedFolder } =
    useModalContext();
  const { mutate } = useDeleteFolder();

  return (
    <div className={styles.home}>
      <Navbar />
      <Sidebar />
      <UploudLayout />

      {isOpenModal && selectedFolder && (
        <Modal>
          <div className={styles.modalRemoveFolder}>
            <span>
              Are you sure that you want to delete folder "{selectedFolder.name}
              " ?
            </span>
            <div className={styles.btnWrapper}>
              <button
                onClick={() => {
                  mutate(selectedFolder._id);
                  setIsOpenModal(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setSelectedFolder(null);
                  setIsOpenModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
