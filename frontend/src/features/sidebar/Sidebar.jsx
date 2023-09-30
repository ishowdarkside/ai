import { useState } from "react";
import AddFolder from "./AddFolder/AddFolder";
import Folders from "./Folders/Folders";
import styles from "./Sidebar.module.scss";
import CreateFolderPanel from "./CreateFolderPanel/CreateFolderPanel";
import FolderLayout from "./FolderLayout/FolderLayout";
import { useFolderContext } from "../../context/FolderContext";

export default function Sidebar() {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const { activeFolder } = useFolderContext();
  return (
    <aside className={styles.sidebar}>
      {!isOpenPanel && !activeFolder ? (
        <>
          <AddFolder onOpenPanel={setIsOpenPanel} />
          <Folders />
        </>
      ) : null}
      {isOpenPanel && <CreateFolderPanel onClosePanel={setIsOpenPanel} />}
      {activeFolder && <FolderLayout />}
    </aside>
  );
}
