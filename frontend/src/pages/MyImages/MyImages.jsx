import { useGetSavedImages } from "../../hooks/useImages";
import Navbar from "../../utilities/Navbar/Navbar";
import Spinner from "../../utilities/Spinner/Spinner";
import styles from "./MyImages.module.scss";
export default function MyImages() {
  const { data, isLoading } = useGetSavedImages();

  if (isLoading)
    return (
      <>
        <Navbar />
        <Spinner />
      </>
    );
  return (
    <>
      <Navbar />
      <div className={styles.sectionWrapper}>
        <div className={styles.container}>
          <h1>My saved AI Images</h1>
          <div className={styles.gridWrapper}>
            {data.map((e) => (
              <img src={`http://127.0.0.1:3000/${e.imageUrl}`} key={e._id} />
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
