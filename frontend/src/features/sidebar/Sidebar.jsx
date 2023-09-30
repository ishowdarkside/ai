import { useState } from "react";
import AddFolder from "./AddFolder/AddFolder";
import Folders from "./Folders/Folders";
import styles from "./Sidebar.module.scss";
import CreateFolderPanel from "./CreateFolderPanel/CreateFolderPanel";
import FolderLayout from "./FolderLayout/FolderLayout";
import testdata from "../../utilities/testdata.json";

export default function Sidebar() {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [ isOpenFolder, setIsOpenFolder ] = useState('');
  return (
    <aside className={styles.sidebar}>
      {!isOpenPanel && !isOpenFolder ? (
        <>
          <AddFolder onOpenPanel={setIsOpenPanel} />
          <Folders testdata={testdata} setIsOpenFolder={setIsOpenFolder} />
        </>
      ): null}
      {isOpenPanel && <CreateFolderPanel onClosePanel={setIsOpenPanel} />}
      {isOpenFolder && <FolderLayout testdata={testdata} setIsOpenFolder={setIsOpenFolder} isOpenFolder={isOpenFolder} />}
    </aside>
  );
}
