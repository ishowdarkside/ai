import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../DraggableBox/DraggableBox";
import { useFileContext } from "../../../context/fileContext";
import styles from "./Generator.module.scss";

export default function Generator() {
  const { image, setFile } = useFileContext();
  const { selectedBackground } = useFileContext();
  console.log(selectedBackground);
  return (
    <div className={styles.generator}>
      <span onClick={() => setFile(null)}>Choose product</span>
      <div className={styles.promptWrapper}>
        <DndProvider backend={HTML5Backend}>
          <div
            className={styles.image}
            style={
              selectedBackground && {
                backgroundImage: `url(http://127.0.0.1:3000/${selectedBackground})`,
              }
            }
          >
            <DraggableBox
              id="box1"
              left={50}
              top={50}
              image={image}
            ></DraggableBox>
          </div>
        </DndProvider>
        <div className={styles.form}>
          <textarea placeholder="Describe the place (e.g., 'mossy granite pedestal'), objects nearby (e.g., 'surrounded by wildflowers'), and the background (e.g., 'sunlit forest in the background'). Add optional enhancements: 'bokeh', 'shallow depth of field', 'behance' etc.”"></textarea>
          {selectedBackground && <button>Generate</button>}
        </div>
      </div>
    </div>
  );
}
