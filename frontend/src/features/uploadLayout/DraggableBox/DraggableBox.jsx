import React, { useState } from 'react';
import { useFileContext } from '../../../context/fileContext';
import styles from './DraggableBox.module.scss';

const DraggableBox = ({ image }) => {
	const [ isDragging, setIsDragging ] = useState(false);
	const [ isResizing, setIsResizing ] = useState(false);
	const [ resizeOption, setResizeOption ] = useState('');
	const { boxRef, resizeSeRef, resizeNeRef, resizeSwRef, resizeNwRef, setPositions, positions } = useFileContext();
	const [ rect, setRect ] = useState({
		top: 100,
		left: 100,
		width: 200,
		height: 200
	});

	function handleMouseDown(e) {
		e.preventDefault();
		const { clientX, clientY } = e;
		setPositions({ x: clientX, y: clientY });
	
		const resizerClass = e.target.className;
		setResizeOption(getResizeOption(resizerClass));
	
		if (resizerClass.includes('resizer')) {
			setIsResizing(true);
		} else {
			setIsDragging(true);
		}
	}
	
	function getResizeOption(className) {
		if (className.includes('resizeSe')) return 'bottom-right';
		if (className.includes('resizeNe')) return 'top-right';
		if (className.includes('resizeNw')) return 'top-left';
		if (className.includes('resizeSw')) return 'bottom-left';
		return 'none'; // or any other default value
	}
	
	function handleMouseMove(e) {
		if (isDragging || isResizing) {
			const { clientX, clientY } = e;
	
			const deltaX = clientX - positions.x;
			const deltaY = clientY - positions.y;
	
			if (isResizing) {
				setRect((prevRect) => {
					const { width, height, left, top } = prevRect;
					let newWidth = width;
					let newHeight = height;
					let newLeft = left;
					let newTop = top;
	
					if (resizeOption.includes('left')) {
						newWidth = Math.max(width - deltaX, 50);
						newLeft = left + (width - newWidth);
					} else {
						newWidth = Math.max(width + deltaX, 50);
					}
	
					if (resizeOption.includes('top')) {
						newHeight = Math.max(height - deltaY, 50);
						newTop = top + (height - newHeight);
					} else {
						newHeight = Math.max(height + deltaY, 50);
					}
	
					return { width: newWidth, height: newHeight, left: newLeft, top: newTop };
				});
			} else if (isDragging) {
				setRect((prevRect) => ({
					...prevRect,
					left: prevRect.left + deltaX,
					top: prevRect.top + deltaY
				}));
			}
	
			setPositions({ x: clientX, y: clientY });
		}
	}

	function handleMouseUp() {
		boxRef.current.addEventListener('mouseleave', () => {
			setIsDragging(false);
			setIsResizing(false);
			setResizeOption('')
		})
	}

	return (
		<div
			ref={boxRef}
			className={styles.draggableImage}
			style={{
				background: `url(${image})`,
				width: rect.width + 'px',
				height: rect.height + 'px',
				top: rect.top + 'px',
				left: rect.left + 'px'
			}}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
			<div className={`${styles.resizeSe} ${styles.resizer}`} ref={resizeSeRef} />
			<div className={`${styles.resizeNe} ${styles.resizer}`} ref={resizeNeRef} />
			<div className={`${styles.resizeSw} ${styles.resizer}`} ref={resizeSwRef} />
			<div className={`${styles.resizeNw} ${styles.resizer}`} ref={resizeNwRef} />
		</div>
	);
};

export default DraggableBox;
