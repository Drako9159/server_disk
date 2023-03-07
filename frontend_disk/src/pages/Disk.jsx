import Main from "../components/Disk/Main";
import Nav from "../components/Nav/Nav";
import { useState } from "react";

export default function Disk() {
  const [folders, setFolders] = useState([]);
  const [nav, setNav] = useState(["storage"]);
  return (
    <div style={{ width: "100%" }}>
      <Nav nav={nav} setNav={setNav} setFolders={setFolders}/>
      <Main nav={nav} setNav={setNav} folders={folders} setFolders={setFolders}/>|
    </div>
  );
}
