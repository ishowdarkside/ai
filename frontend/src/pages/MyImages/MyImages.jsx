import { useDeleteImage, useGetSavedImages } from "../../hooks/useImages";
import Navbar from "../../utilities/Navbar/Navbar";
import Spinner from "../../utilities/Spinner/Spinner";
import { FaTimes } from 'react-icons/fa'
import styles from "./MyImages.module.scss";
import { useModalContext } from "../../context/ModalContext";
import Modal from "../../utilities/Modal/Modal";
export default function MyImages() {
  const { isOpenModal, setIsOpenModal, selectedImage, setSelectedImage } = useModalContext();
  const { data, isLoading } = useGetSavedImages();
  const { mutate } = useDeleteImage();


  if (isLoading)
    return (
      <>
        <Navbar />
        <Spinner />
      </>
    );
  return (
    <>
      <Navbar />
      <div className={styles.sectionWrapper}>
        <div className={styles.container}>
          <h1>My saved AI Images</h1>
          <div className={styles.gridWrapper}>
            {data.map((e) => (
              <div className={styles.image} key={e._id} style={{ backgroundImage: `url(${`http://127.0.0.1:3000/${e.imageUrl}`})`}}>
                <div className={styles.deleteImage} onClick={() => {
                  setIsOpenModal(true)
                  setSelectedImage(e)
                }}><FaTimes /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {isOpenModal && selectedImage && (
        <Modal>
          <div className={styles.modalRemoveImage}>
            <span>
              Are you sure that you want to delete this image?
            </span>
            <div className={styles.btnWrapper}>
              <button
                onClick={() => {
                  mutate(selectedImage._id);
                  setIsOpenModal(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setSelectedImage(null);
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
