import { Link, useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.notFoundPage}>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        &larr; Go back
      </button>
      <h1>Page Not Found 😢</h1>
    </div>
  );
}
