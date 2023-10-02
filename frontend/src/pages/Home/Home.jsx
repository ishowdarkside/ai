import Sidebar from "../../features/sidebar/Sidebar";
import UploudLayout from "../../features/uploadLayout/UploudLayout";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Sidebar />
      <UploudLayout />
    </div>
  );
}
