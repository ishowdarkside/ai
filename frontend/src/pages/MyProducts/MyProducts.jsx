import Navbar from "../../utilities/Navbar/Navbar";
import Modal from "../../utilities/Modal/Modal";
import { FaTimes } from 'react-icons/fa'
import { useModalContext } from "../../context/ModalContext";
import styles from "./MyProducts.module.scss";

export default function MyProducts() {  
  const { isOpenModal, setIsOpenModal, selectedProduct, setSelectedProduct } = useModalContext();
  const storageImages = JSON.parse(localStorage.getItem("generatedImages")) || [];

  return (
    <>
      <Navbar />
      <div className={styles.sectionWrapper}>
        <div className={styles.container}>
          <h1>My Generated Images</h1>
          <div className={styles.gridWrapper}>
            {storageImages.map((e, i) => (
              <div className={styles.image} key={i} style={{ backgroundImage: `url(${e})`}}>
                <div className={styles.deleteImage} onClick={() => {
                  setIsOpenModal(true)
                  setSelectedProduct(e)
                }}><FaTimes /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {isOpenModal && selectedProduct && (
        <Modal>
          <div className={styles.modalRemoveImage}>
            <span>
              Are you sure that you want to delete this image?
            </span>
            <div className={styles.btnWrapper}>
              <button
                onClick={() => {
                  localStorage.setItem("generatedImages", JSON.stringify(storageImages.filter(image => image !== selectedProduct)))
                  setIsOpenModal(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  //setSelectedProduct(null);
                  setIsOpenModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
