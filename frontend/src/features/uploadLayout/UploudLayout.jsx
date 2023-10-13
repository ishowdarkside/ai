import { useFileContext } from "../../context/fileContext";
import Generator from "./Generator/Generator";
import Uploud from "./Uploud/Uploud";
import styles from "./UploudLayout.module.scss";
export default function UploudLayout() {
  const { file } = useFileContext();

  return (
    <div className={styles.uploudLayout}>
      {!file ? <Uploud /> : <Generator />}
    </div>
  );
}
