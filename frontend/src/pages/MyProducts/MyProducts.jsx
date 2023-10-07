import Navbar from "../../utilities/Navbar/Navbar";
import Modal from "../../utilities/Modal/Modal";
import { FaTimes } from "react-icons/fa";
import { useModalContext } from "../../context/ModalContext";
import styles from "./MyProducts.module.scss";
import { useGetProductImages } from "../../hooks/useImages";
import Spinner from "../../utilities/Spinner/Spinner";
import { deleteImage } from "../../services/images";
import { useQueryClient } from "@tanstack/react-query";

export default function MyProducts() {
  const { isOpenModal, setIsOpenModal, selectedProduct, setSelectedProduct } =
    useModalContext();

  const { data, isLoading } = useGetProductImages();
  const queryClient = useQueryClient();
  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className={styles.sectionWrapper}>
        <div className={styles.container}>
          <h1>My Generated Images</h1>
          <div className={styles.gridWrapper}>
            {data.map((e, i) => (
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(http://127.0.0.1:3000/${e.imageUrl})`,
                }}
                key={i}
              >
                <a href={`http://127.0.1:3000/${e.imageUrl}`} download>
                  DOWNLOAD IMAGE
                </a>
                <div
                  className={styles.deleteImage}
                  onClick={() => {
                    setIsOpenModal(true);
                    setSelectedProduct(e._id);
                  }}
                >
                  <FaTimes />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {isOpenModal && selectedProduct && (
        <Modal>
          <div className={styles.modalRemoveImage}>
            <span>Are you sure that you want to delete this image?</span>
            <div className={styles.btnWrapper}>
              <button
                onClick={async () => {
                  await deleteImage(selectedProduct);
                  queryClient.invalidateQueries(["productImages"]);
                  setIsOpenModal(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
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
