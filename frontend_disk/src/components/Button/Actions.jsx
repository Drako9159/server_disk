import styles from "./Actions.module.css";
import iconMenu from "../../assets/icons/menu.svg";
import { useState } from "react";

export default function Actions({ modal, setModal }) {
  const [btnActive, setBtnActive] = useState(false);
  function handleClick(e) {
    const value = e.target.value;
    setModal({ modal: true, value: value});
  }
  function activeBtn() {
    setBtnActive(!btnActive);
  }
  return (
    <>
      <div onClick={activeBtn} className={styles.container}>
      <img className={styles.iconMenu} src={iconMenu}></img>
        {btnActive ? (
          <div>
            <button onClick={handleClick} value="create">Create folder</button>
            <button onClick={handleClick} value="upload">Upload file</button>
          </div>
          
        ) : null}
        
      </div>
    </>
  );
}
