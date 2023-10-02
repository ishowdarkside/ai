import styles from './Uploud.module.scss';
export default function Uploud() {
    return (
        <form>
            <label htmlFor='uploud' className={styles.uploud}>
                <h2>Uploud your product image to get started</h2>
            </label>
            <input type="file" id='uploud' className={styles.hide_input} />
        </form>
    )
}