import { useEffect } from "react";
import { getFolders, getFiles } from "../../api/files";
import styles from "./Main.module.css";
const URL = import.meta.env.VITE_BACKEND;
export default function Main({
  modal,
  setModal,
  nav,
  setNav,
  folders,
  setFolders,
}) {
  useEffect(() => {
    getFolders().then((data) => {
      setFolders(data.data.data);
    });
  }, []);

  function parseNav(folder) {
    let arr = [];
    nav.forEach((e) => {
      arr.push(e);
    });

    arr.push(folder);
    setNav(arr);

    let navs = "";
    nav.forEach((e) => {
      navs += `${e}/`;
    });

    return navs + folder;
  }

  function handleClick(folder) {
    if (!folder.isDirectory) {
      setModal({
        modal: true,
        value: "file",
        type: folder.type,
        size: folder.size,
        name: folder.name,
      });
    } else {
      setModal({ modal: false, value: "none" });
      let navs = parseNav(folder.name);
      getFiles(navs).then((data) => {
        setFolders(data.data.data);
      });
    }
  }

  if (folders.length < 1)
    return (
      <div className={styles.container}>
        <h1 className={styles.noFiles}>empty</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      {folders.map((e) => {
        return (
          <div
            onClick={() => handleClick(e)}
            key={e.name}
            className={styles.card}
          >
            <img
              className={styles.iconFolder}
              src={`${URL}/storage/icons?type=${
                e.isDirectory ? "folder_fill" : "file"
              }`}
              alt="folder"
            />
            <div className={styles.contentName}>
              <p className={styles.folderName}>{e.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
