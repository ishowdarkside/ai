import { GrGallery } from 'react-icons/gr';
import styles from './Uploud.module.scss';
export default function Uploud() {
    return (
        <form>
            <label htmlFor='uploud' className={styles.uploud}>
                <div className={styles.header}>
                    <GrGallery />
                    <h2>Uploud your product image to get started</h2>
                    <p><span>Click to uploud</span> or drag and drop</p>
                    <p>Formats: JPG, PNG</p>
                </div>
                <div className={styles.footer}>
                    <div className={styles.text}>
                        <p>Remove background</p>
                        <p>Product images with transparent backgrounds give the best result</p>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" />
                    </div>
                </div>
            </label>
            <input type="file" id='uploud' className={styles.hide_input} />
        </form>
    )
}