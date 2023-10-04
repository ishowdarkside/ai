import { useEffect, useRef, useState } from 'react';
import { GrGallery } from 'react-icons/gr';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Draggable from "react-draggable";  
import styles from './Uploud.module.scss';
import DraggableBox from '../DraggableBox/DraggableBox';

export default function Uploud() {
  const [ file, setFile ] = useState(null)
  const [ image, setImage ] = useState(null)
 
  function handleImageChange(e) {
    setFile(e.target.files[0])
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setImage(reader.result)
    }
  }

  const uploud = (
    <form className={styles.form}>
			<label htmlFor="uploud" className={styles.uploud}>
				<GrGallery />
				<h2>Uploud your product image to get started</h2>
				<p>
					<span>Click to uploud</span> or drag and drop
				</p>
				<p>Formats: JPG, PNG</p>
			</label>
			<input type="file" id="uploud" className={styles.hide_input} onChange={handleImageChange} />
		</form>
  );

  const generator = (
    <div className={styles.generator}>
      <span onClick={() => setFile(null)}>Choose product</span>
      <div className={styles.promptWrapper}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.image}>
          <DraggableBox id="box1" left={50} top={50} image={image}>
          </DraggableBox>
        </div>
      </DndProvider>
        <div className={styles.form}>
          <textarea></textarea>
        </div>
      </div>
    </div>
  )

	return file ? generator : uploud
}