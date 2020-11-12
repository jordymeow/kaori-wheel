import { useEffect, useRef } from 'react';

const Pie = (props) => {
  const { index, total, contents, center, radius } = props;

  const ref = useRef();
  // const textRef = useRef();
  const color = contents.children[0].color;
  const pieAngle = contents.children.length / total * 360;

  useEffect(() => {
    const slice = (2 * Math.PI) / total;
    const angle = index * slice;
    const x = center + radius * Math.sin(angle);
    const y = center - radius * Math.cos(angle);
  }, []);

  return (
    <>
      <div ref={ref} className="wheel-part">
        <div className="wheel-part-content">{contents.name}</div>
      </div>
      <style jsx>{`
        .wheel-part {
          position: absolute;
          width: 64px;
          height: 64px;
          top: 0;
          left: 0;
          // width: 1000px;
          // height: 1000px;
          // border-radius: 50%;
          // background: transparent;
          // background-image: none;
          // background-image: none;
          // background-image: linear-gradient(to right, transparent 50%, ${color} 0);
          // z-index: ${index};
        }
        .wheel-part::before {
          // box-sizing: border-box;
          // content: '';
          // display: block;
          // margin-left: 50%;
          // height: 100%;
          // border-radius: 0 100% 100% 0 / 50%;
          // background-color: transparent;
          // transform-origin: left;
          // transform: rotate(${pieAngle}deg);
        }
        .wheel-part-content {
          color: ${color};
          font-size: 24px;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          // position: absolute;
          // top: 0;
          // left: 0;
        }
      `}</style>
    </>
  );
}

export default Pie;