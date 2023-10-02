import styles from './UploudLayout.module.scss';
import Uploud from './uploud/Uploud';
export default function UploudLayout() {
    return (
        <div className={styles.uploudLayout}>
            <Uploud />
        </div>
    )
}