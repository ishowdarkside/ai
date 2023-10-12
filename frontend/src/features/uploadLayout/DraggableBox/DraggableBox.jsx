import React, { useState } from 'react';
import { useFileContext } from '../../../context/fileContext';
import styles from './DraggableBox.module.scss';

const DraggableBox = ({ image }) => {
	const [ isDragging, setIsDragging ] = useState(false);
	const [ isResizing, setIsResizing ] = useState(false);
	const [ initialPos, setInitialPos ] = useState({ x: 0, y: 0 });
  const { boxRef } = useFileContext();
	const [ rect, setRect ] = useState({
		top: 100,
		left: 100,
		width: 200,
		height: 200
	});

	function handleMouseDown(e) {
		e.preventDefault();
		const { clientX, clientY } = e;

		setInitialPos({ x: clientX, y: clientY });

		const resizerClass = e.target.className;
		if (resizerClass.includes('resizer')) {
			setIsResizing(true);
		} else {
			setIsDragging(true);
		}
	};

	function handleMouseMove(e) {
		if (isDragging || isResizing) {
			const { clientX, clientY } = e;

			const deltaX = clientX - initialPos.x;
			const deltaY = clientY - initialPos.y;

			if (isResizing) {
				setRect((prevRect) => ({
					...prevRect,
					width: Math.max(prevRect.width + deltaX, 50),
					height: Math.max(prevRect.height + deltaY, 50)
				}));
			} else if (isDragging) {
				setRect((prevRect) => ({
					...prevRect,
					left: prevRect.left + deltaX,
					top: prevRect.top + deltaY
				}));
			}

			setInitialPos({ x: clientX, y: clientY });
		}
	};

	function handleMouseUp() {
		setIsDragging(false);
		setIsResizing(false);
	};

	return (
		<div
			ref={boxRef}
      className={styles.draggableImage}
			style={{
				background: `url(${image})`,
				width: rect.width + 'px',
				height: rect.height + 'px',
				top: rect.top + 'px',
				left: rect.left + 'px',
			}}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<div className={`${styles.resizeSe} ${styles.resizer}`} />
		</div>
	);
};

export default DraggableBox;
