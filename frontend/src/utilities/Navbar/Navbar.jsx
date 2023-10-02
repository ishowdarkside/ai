import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/ai-prompt">AI Prompt</NavLink>
      </ul>
    </nav>
  );
}
