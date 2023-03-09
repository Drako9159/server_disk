import styles from "./Nav.module.css";
import { getFolders } from "../../api/files";
import { getFiles } from "../../api/files";
const URL = import.meta.env.VITE_BACKEND;
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
      <img
        onClick={handleClickStorage}
        src={`${URL}/storage/icons?type=storage`}
      ></img>
      {nav.map((e) => {
        return (
          <div key={e} className={styles.nav}>
            <p onClick={() => handleClick()} className={styles.navText}>
              {e}&nbsp;/

            </p>
          </div>
        );
      })}
    </div>
  );
}
