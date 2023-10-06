import { GrGallery } from "react-icons/gr";
import { useFileContext } from "../../../context/fileContext";
import styles from "./Uploud.module.scss";

export default function Uploud() {
  const { setFile, setImage } = useFileContext();
  function handleImageChange(e) {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  }

  function handleFileDrag(e) {
    e.preventDefault();
  } 
  function handleFileDrop(e) {
    e.preventDefault();
    
    setFile(e.dataTransfer.files[0])
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  }

  return (
    <form className={styles.form}>
      <label htmlFor="uploud" className={styles.uploud} onDragOver={handleFileDrag}
        onDrop={handleFileDrop}>
        <GrGallery />
        <h2>Uploud your product image to get started</h2>
        <p>
          <span>Click to uploud</span> or drag and drop
        </p>
        <p>Formats: JPG, PNG</p>
      </label>
      <input
        type="file"
        id="uploud"
        className={styles.hide_input}
        onChange={handleImageChange}
      />
    </form>
  );
}
