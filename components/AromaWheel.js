import { useEffect, useRef } from "react";
import gsap from 'gsap/dist/gsap';
import Draggable from 'gsap/dist/Draggable';
// In order to use it, it needs membership.
// @see: https://greensock.com/docs/v3/Plugins/InertiaPlugin
// import InertiaPlugin from 'gsap/dist/InertiaPlugin';
import Pie from './Pie';

const AromaWheel = (props) => {
  const { aromas } = props;

  const ref = useRef();
  const lengthListOfChildren = aromas.map(v => v.children.length);
  const totalLengthOfChildren = aromas.map(v => v.children.length).reduce((a, b) => a + b, 0);

  useEffect(() => {
    gsap.registerPlugin(Draggable);
    Draggable.create(ref.current, {
      type: "rotation",
      inertia: true // It does not work without membership.
    });
  }, []);

  const getPieIndex = (index) => {
    if (index === 0) return index;

    return lengthListOfChildren.filter((_, j) => j < index)?.reduce((a, b) => a + b, 0);
  }

  return (
    <>
      <div ref={ref} className="wheel">
        {aromas.map((aroma, i) => {
          return (
            <Pie
              key={aroma.name}
              index={getPieIndex(i)}
              total={totalLengthOfChildren}
              contents={aroma}
              center={500}
              radius={420}
            />
          );
        })}
      </div>
      <style jsx>{`
        .wheel {
          position: relative;
          width: 1000px;
          height: 1000px;
        }
      `}</style>
    </>
  );
};

export default AromaWheel;
