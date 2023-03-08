import { useEffect, useState } from "react";
import { getFolders, getFiles } from "../../api/files";
import styles from "./Main.module.css";
import iconFolder from "../../assets/icons/disk/folder-fill.svg";
import iconFile from "../../assets/icons/disk/file.svg";

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
    if (folder.type !== "folder") {
      setModal({
        modal: true,
        value: "file",
        type: folder.type,
        size: folder.size,
        name: folder.name,
      });
    } else {
      let navs = parseNav(folder.name);
      getFiles(navs).then((data) => {
        setFolders(data.data.data);
      });
    }
  }

  if (folders.length < 1)
    return (
      <div className={styles.container}>
        <h1 className={styles.noFiles}>no files</h1>
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
              src={e.isDirectory ? iconFolder : iconFile}
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
