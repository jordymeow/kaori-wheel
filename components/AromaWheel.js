import { useEffect, useRef } from "react";
import Pie from './Pie';

const AromaWheel = (props) => {
  const { aromas } = props;

  const ref = useRef();
  const lengthListOfChildren = aromas.map(v => v.children.length);
  const totalLengthOfChildren = aromas.map(v => v.children.length).reduce((a, b) => a + b, 0);

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
