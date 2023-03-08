import styles from "./Modal.module.css";
import { useState } from "react";
import { createFolder, getFiles, uploadFile } from "../../api/files";
export default function Modal({
  setCharge,
  modal,
  setModal,
  nav,
  folders,
  setFolders,
}) {
  const [folderName, setFolderName] = useState();
  const [file, setFile] = useState();
  function handleKeyDown(e) {
    if (e.key === "Enter" && folderName) {
      handleClick();
    }
  }
  function handleClick() {
    //setModal(false);
    let navs = "";
    nav.forEach((e) => {
      navs += `${e}/`;
    });

    createFolder(navs, folderName).then((data) => {
      getFiles(navs).then((data) => {
        setFolders(data.data.data);
      });
    });
    setModal({ modal: false, value: "none" });
  }
  function handleChange(e) {
    const folderName = e.target.value;
    setFolderName(folderName);
  }
  function handleChangeFile(e) {
    const file = e.target.files[0];
    setFile(file);
  }
  function handleClickFile() {
    setCharge(true);
    let navs = "";
    nav.forEach((e) => {
      navs += `${e}/`;
    });
    uploadFile(navs, file).then((data) => {
      getFiles(navs).then((data) => {
        setFolders(data.data.data);
        setCharge(false);
      });
    });
    setModal({ modal: false, value: "none" });
  }
  function handleClose() {
    setModal({ modal: false, value: "none" });
  }

  return (
    <>
      {modal.value === "create" ? (
        <div className={styles.container}>
          <div className={styles.modal}>
            <input
              ref={(input) => input && input.focus()}
              type="text"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="folder name"
            ></input>
            <button onClick={handleClick}>Create</button>
            <div onClick={handleClose} className={styles.close}>
              X
            </div>
          </div>
        </div>
      ) : modal.value === "upload" ? (
        <div className={styles.container}>
          <div className={styles.modal}>
            <label htmlFor="files">Select file</label>
            <input
              onChange={handleChangeFile}
              type="file"
              name="files"
              id="files"
            ></input>
            <button onClick={handleClickFile}>Upload</button>
            <div onClick={handleClose} className={styles.close}>
              X
            </div>
          </div>
        </div>
      ) :  modal.value === "file" ? (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.file}>
                    <div className={styles.file__name}>{modal.name}</div>
                    <div className={styles.file__size}>{modal.size}</div>
                    <div className={styles.file__type}>{modal.type}</div>
                </div>
                <div onClick={handleClose} className={styles.close}>
                    X
                </div>
            </div>
        </div>
      ) : null}
    </>
  );
}
