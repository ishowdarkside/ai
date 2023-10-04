import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import styles from './DraggableBox.module.scss';

const DraggableBox = ({ id, left, top, children, image }) => {
	const boxRef = useRef(null);

	return (
		<Draggable defaultPosition={{ x: left, y: top }} bounds="parent" nodeRef={boxRef}>
			<div
				ref={boxRef}
                className={styles.draggableImage}
				style={{
					backgroundImage: `url(${image})`,
				}}
			>
				{children}
			</div>
		</Draggable>
	);
};

export default DraggableBox;
