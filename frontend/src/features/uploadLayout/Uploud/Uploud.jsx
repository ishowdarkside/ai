import { GrGallery } from 'react-icons/gr';
import styles from './Uploud.module.scss';
import { useState } from 'react';
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
        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
        <div className={styles.form}>
          <textarea></textarea>
        </div>
      </div>
    </div>
  )

	return file ? generator : uploud
}
