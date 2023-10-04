import { useFileContext } from "../../context/fileContext";
import Generator from "./Generator/Generator";
import styles from "./UploudLayout.module.scss";
import Uploud from "./Uploud/Uploud";
export default function UploudLayout() {
  const { file } = useFileContext();
  return (
    <div className={styles.uploudLayout}>
      {!file ? <Uploud /> : <Generator />}
    </div>
  );
}
