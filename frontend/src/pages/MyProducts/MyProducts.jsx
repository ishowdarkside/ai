import Navbar from "../../utilities/Navbar/Navbar";
import styles from "./MyProducts.module.scss";

export default function MyProducts() {
  const storageImages =
    JSON.parse(sessionStorage.getItem("generatedImages")) || [];

  return (
    <>
      <Navbar />
      <div className={styles.sectionWrapper}>
        <div className={styles.container}>
          <h1>My Generated Images</h1>
          <div className={styles.gridWrapper}>
            {storageImages.map((e, i) => (
              <div key={i}>
                <a href={e} download>
                  <img src={e} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
