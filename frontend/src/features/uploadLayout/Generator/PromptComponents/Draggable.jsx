/* eslint-disable react/prop-types */
import styles from "../Generator.module.scss";
import { useFileContext } from "../../../../context/fileContext";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useRef } from "react";

export default function Draggable({ containerRef }) {
  const dragEl = useRef(null);
  const { setPositions, setProductSize, image } = useFileContext();
  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    height: 200,
    width: 200,
  }));

  console.log(image);
  const bind = useDrag(
    (state) => {
      const isResizing = state.event.target === dragEl.current;
      if (isResizing) {
        //ubaciti novi state u context za width i height i to tamo koristiti kod handlecompose
        setProductSize({ width: state.offset[0], height: state.offset[1] });
        api.set({
          width: state.offset[0],
          height: state.offset[1],
        });
      } else {
        setPositions({ x: state.offset[0], y: state.offset[1] });
        api.set({
          x: state.offset[0],
          y: state.offset[1],
        });
      }
    },
    {
      from: (event) => {
        const isResizing = event.target === dragEl.current;
        if (isResizing) {
          return [width.get(), height.get()];
        } else {
          return [x.get(), y.get()];
        }
      },
      bounds: (state) => {
        const isResizing = state.event.target === dragEl.current;
        const containerWidth = containerRef.current.clientWidth ?? 0;
        const containerHeight = containerRef.current.clientHeight ?? 0;
        if (isResizing) {
          return {
            top: 50,
            left: 50,
            right: containerWidth - x.get(),
            bottom: containerHeight - y.get(),
          };
        } else {
          return {
            top: 0,
            left: 0,
            right: containerWidth - width.get(),
            bottom: containerHeight - height.get(),
          };
        }
      },
    }
  );
  return (
    <animated.div
      style={{
        x,
        y,
        width,
        height,
        backgroundImage: `url(${image})`,
      }}
      {...bind()}
      className={styles.box}
    >
      <div className={styles.resizeMe} ref={dragEl}></div>
    </animated.div>
  );
}
