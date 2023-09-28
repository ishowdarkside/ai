import Sidebar from "../../features/sidebar/Sidebar";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Sidebar />
    </div>
  );
}
