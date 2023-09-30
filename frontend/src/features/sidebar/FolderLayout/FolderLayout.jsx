import ImageCard from '../ImageCard/ImageCard';
import { BsArrowLeftShort } from 'react-icons/bs'
import styles from './FolderLayout.module.scss';
export default function FolderLayout({ testdata, setIsOpenFolder, isOpenFolder }) {
	const data = testdata.filter(({ title }) => title === isOpenFolder).map(({ images }) => images);

	return (
		<div className={styles.folder}>
			<h3 onClick={() => setIsOpenFolder('')}><BsArrowLeftShort /> {isOpenFolder}</h3>
			<div className={styles.folder_layout}>{data[0].map((item, index) => <ImageCard data={item} />)}</div>
		</div>
	);
}
