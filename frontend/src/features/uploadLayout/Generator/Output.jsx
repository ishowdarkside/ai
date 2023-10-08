import { useGeneratorContext } from "../../../context/GeneratorContext";
import { saveProductImage } from "../../../services/images";
import styles from "./Generator.module.scss";
import { BsFillImageFill } from "react-icons/bs";
export default function Output() {
  const { resizedImage, isSaved, setIsSaved } = useGeneratorContext();

  if (resizedImage)
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${resizedImage})`,
          }}
          className={styles.outputWrapper}
        />
        <div className={styles.operationWrapper}>
          {!isSaved && (
            <button
              onClick={async () => {
                await saveProductImage(resizedImage);
                setIsSaved(true);
              }}
            >
              Save Image
            </button>
          )}
          <a href={resizedImage} download>
            Download Image
          </a>
        </div>
      </div>
    );
  else
    return (
      <div className={styles.fillPlaceholder}>
        <BsFillImageFill />
      </div>
    );
}
