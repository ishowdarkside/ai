import { useGeneratorContext } from "../../../context/GeneratorContext";
import styles from "./Generator.module.scss";
import { BsFillImageFill } from "react-icons/bs";
export default function Output() {
  const { resizedImage } = useGeneratorContext();
  if (resizedImage)
    return (
      <a href={resizedImage} download className={styles.outputLink}>
        <div className={styles.outputOverlay}>
          <span>CLICK TO DOWNLOAD IMAGE</span>
        </div>
        <div
          style={{
            backgroundImage: `url(${resizedImage})`,
          }}
          className={styles.outputWrapper}
        />
      </a>
    );
  else
    return (
      <div className={styles.fillPlaceholder}>
        <BsFillImageFill />
      </div>
    );
}
