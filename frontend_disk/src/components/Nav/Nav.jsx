import styles from "./Nav.module.css";
import { getFolders } from "../../api/files";
import { getFiles } from "../../api/files";
import iconStorage from "../../assets/icons/disk/storage.svg";
export default function Nav({ nav, setNav, setFolders }) {
  function parseNav() {
    nav.pop();
    setNav([...nav]);

    let navs = "";
    nav.forEach((e) => {
      navs += `${e}/`;
    });

    return navs;
  }
  function handleClickStorage() {
    getFolders().then((data) => setFolders(data.data.data));
    setNav([]);
  }

  function handleClick(e) {
    if (nav.length === 0) {
      getFolders().then((data) => setFolders(data.data.data));
    } else {
      let navs = parseNav(e);

      getFiles(navs).then((data) => {
        setFolders(data.data.data);
      });
    }
  }

  return (
    <div className={styles.container}>
      <img onClick={handleClickStorage} src={iconStorage}></img>
      {nav.map((e) => {
        return (
          <div key={e} className={styles.nav}>
            <p> &nbsp; </p>
            <p onClick={() => handleClick()} className={styles.navText}>
              {e}
            </p>
            <p> &nbsp; /</p>
          </div>
        );
      })}
    </div>
  );
}
