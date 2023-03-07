import { useEffect, useState } from "react";
import { getFolders, getFiles } from "../../api/files";
import styles from "./Main.module.css";
import iconFolder from "../../assets/icons/disk/folder-fill.svg";
import iconFile from "../../assets/icons/disk/file.svg";

export default function Main({nav, setNav, folders, setFolders}) {
  

  useEffect(() => {
    getFolders().then((data) => {
      setFolders(data.data.folder);
    });
  }, []);

  function handleClick(folder) {
    
    if(folder === "isFile") return;
    setNav([...nav, folder]);
    getFiles(folder).then((data) => {
      console.log(data.data.folder);
      setFolders(data.data.folder);
    });
  }

  if(folders.length < 1) return <h1>no files</h1>

  return (
    <div className={styles.container}>
      {folders.map((e) => {
        return (
          <div
            onClick={() => handleClick(e.split(".")[1] ? "isFile" : e)}
            key={e}
            className={styles.card}
          >
            <img
              className={styles.iconFolder}
              src={e.split(".")[1] ? iconFile : iconFolder}
              alt="folder"
            />
            <p className={styles.folderName}>{e}</p>
          </div>
        );
      })}
    </div>
  );
}
