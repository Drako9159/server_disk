import Main from "../components/Disk/Main";
import Nav from "../components/Nav/Nav";
import Actions from "../components/Button/Actions";
import Modal from "../components/Modal/Modal";
import { useState } from "react";
import ChargeAnimation from "../components/ChargeAnimation";

export default function Disk() {
  const [folders, setFolders] = useState([]);
  const [nav, setNav] = useState([]);
  const [modal, setModal] = useState({});
  const [charge, setCharge] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <Nav nav={nav} setNav={setNav} setFolders={setFolders} />
      
      <Modal
        setCharge={setCharge}
        modal={modal}
        setModal={setModal}
        nav={nav}
        folders={folders}
        setFolders={setFolders}
      />
      { charge ? <ChargeAnimation /> : null}
      <Main
      modal={modal}
      setModal={setModal}
        nav={nav}
        setNav={setNav}
        folders={folders}
        setFolders={setFolders}
      />
      

      <Actions modal={modal} setModal={setModal} />
    </div>
  );
}
