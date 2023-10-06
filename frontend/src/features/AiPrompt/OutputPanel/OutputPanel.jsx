import { usePromptContext } from "../../../context/PromptContext";
import styles from "./OutputPanel.module.scss";

export default function OutputPanel() {
  const { imgLink, setSelectedImages, selectedImages } = usePromptContext();

  return (
    <div className={styles.outputWrapper}>
      {imgLink &&
        imgLink.map((e) => (
          <img
            src={e.tmp_url}
            onClick={() => {
              if (selectedImages.includes(e.tmp_url))
                return setSelectedImages((curr) =>
                  curr.filter((e) => e !== e.tmp_url)
                );
              return setSelectedImages((curr) => [...curr, e.tmp_url]);
            }}
            className={
              selectedImages.includes(e.tmp_url) ? styles.isSelected : ""
            }
            key={e.tmp_url}
          />
        ))}
    </div>
  );
}
