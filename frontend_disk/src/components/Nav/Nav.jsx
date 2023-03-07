import styles from "./Nav.module.css";
import { getFolders } from "../../api/files";

export default function Nav({ nav, setNav, setFolders }) {
  let navs = "";
  nav.forEach((e) => {
    navs += ` / ${e}`;
  });

  function handleClick() {
    if (nav.length === 1 && nav[0] === "storage") {
      getFolders().then((data) => setFolders(data.data.folder));
    } else {
      nav.pop();
      setNav([...nav]);
    }
  }

  return (
    <div className={styles.container}>
      {nav.length >= 1 && (
        <button onClick={handleClick} className={styles.button}>
          {" "}
          <p className={styles.buttonText}>Back</p>{" "}
        </button>
      )}
    </div>
  );
}
