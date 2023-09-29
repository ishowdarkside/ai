import { useState } from "react";
import AddFolder from "./AddFolder/AddFolder";
import Folders from "./Folders/Folders";
import styles from "./Sidebar.module.scss";
import CreateFolderPanel from "./CreateFolderPanel/CreateFolderPanel";

export default function Sidebar() {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  return (
    <aside className={styles.sidebar}>
      {!isOpenPanel && (
        <>
          <AddFolder onOpenPanel={setIsOpenPanel} />
          <Folders />
        </>
      )}
      {isOpenPanel && <CreateFolderPanel onClosePanel={setIsOpenPanel} />}
    </aside>
  );
}
