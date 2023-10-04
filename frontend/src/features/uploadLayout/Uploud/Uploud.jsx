import { GrGallery } from 'react-icons/gr';
import styles from './Uploud.module.scss';
export default function Uploud() {
	return (
		<form className={styles.form}>
			<label htmlFor="uploud" className={styles.uploud}>
				<GrGallery />
				<h2>Uploud your product image to get started</h2>
				<p>
					<span>Click to uploud</span> or drag and drop
				</p>
				<p>Formats: JPG, PNG</p>
			</label>
			<input type="file" id="uploud" className={styles.hide_input} />
		</form>
	);
}
