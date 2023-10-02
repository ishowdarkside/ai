import Sidebar from "../../features/sidebar/Sidebar";
import UploudLayout from "../../features/uploadLayout/UploudLayout";
import Navbar from "../../utilities/Navbar/Navbar";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Sidebar />
      <UploudLayout />
    </div>
  );
}
