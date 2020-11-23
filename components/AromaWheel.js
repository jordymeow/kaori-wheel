import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Pie from './Pie';
import { LabelTypes, LabelAligns } from './Label';

const DragPosition = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
}

const AromaWheel = (props) => {
  const { aromas, aromaGroups } = props;
  const diameter = 800;
  const [{ x, previousX }, set] = useSpring(() => ({ x: 0, previousX: 0, config: { friction: 70, tension: 250 } }))

  const horizontalDragPositions = [
    DragPosition.right,
    DragPosition.left
  ];
  const clockwiseDragPositions = [
    DragPosition.top,
    DragPosition.right
  ];
  const bind = useDrag(
    ({ args: [position], down, movement: [mx, my] }) => {
      const targetMovement = horizontalDragPositions.includes(position) ? my : mx;
      const calculatedX = targetMovement / 200;
      const nextPreviousX = clockwiseDragPositions.includes(position) ? previousX.value + calculatedX : previousX.value - calculatedX;
      const x = clockwiseDragPositions.includes(position) ? previousX.value + calculatedX : previousX.value - calculatedX;
      set({
        position,
        previousX: down ? previousX.value : nextPreviousX,
        x,
      });
    }
  );

  // Pie Data
  const parentsData = aromas.map(v => {
    return {
      ...v,
      value: v.children.length,
      labelColor: '#fff'
    };
  });
  const chirdrenData = aromas.flatMap(v => v.children);
  const innerParentsData = parentsData.map(v => {
    return {
      ...v,
      labelType: LabelTypes.horizontal,
      labelAlign: LabelAligns.middle
    }
  });
  const groupData = aromaGroups.map(v => {
    return {
      ...v,
      labelAlign: LabelAligns.middle,
      value: parentsData.filter(d => v.children.includes(d.name))
              .flatMap(d => d.children)
              .length
    };
  });

  return (
    <>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div {...bind(DragPosition.top)} className="drag-area top"></div>
        <div {...bind(DragPosition.right)} className="drag-area right" ></div>
        <div {...bind(DragPosition.left)} className="drag-area left"></div>
        <div {...bind(DragPosition.bottom)} className="drag-area bottom"></div>
        <animated.div
          style={{
            transform: x.interpolate((x) => `matrix3d(${Math.cos(-x)}, ${Math.sin(x)}, 0, 0, ${Math.sin(-x)}, ${Math.cos(-x)}, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`),
          }}
        >
          <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} xmlns="http://www.w3.org/2000/svg" version="1.1">
            <Pie
              data={parentsData}
              radius={400}
              hole={375}
              labels={true}
              strokeWidth={1}
              stroke={'#fff'}
            />
            <Pie
              data={chirdrenData}
              diameter={diameter}
              radius={375}
              hole={240}
              labels={true}
            />
            <Pie
              data={innerParentsData}
              diameter={diameter}
              radius={240}
              hole={130}
              labels={true}
              strokeWidth={1}
              stroke={'#fff'}
            />
            <Pie
              data={groupData}
              diameter={diameter}
              radius={130}
              hole={75}
              labels={true}
              strokeWidth={1}
              stroke={'#fff'}
            />
            <Pie
              data={[{ value: chirdrenData.length, name: 'Center', color: '#fff' }]}
              diameter={diameter}
              radius={75}
              hole={0}
              labels={true}
              strokeWidth={1}
              stroke={'#fff'}
            />
          </svg>
        </animated.div>
      </div>
      <style jsx>{`
        svg {
          display: inline-block;
          vertical-align: middle;
          transform-origin: 50% 50%;
          transform: rotate(-90deg);
          animation: scale .6s;
          margin: 10px;
        }
        svg text {
          font-family: Helvetica, Arial, sans-serif;
          font-weight: bolder;
          font-size: 12px;
        }
        .drag-area {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 50%;
          opacity: 0.5;
          transform-origin: right bottom;
          z-index: 100;
        }
        .drag-area.top {
          transform: rotate(45deg);
        }
        .drag-area.right {
          transform: rotate(135deg);
        }
        .drag-area.left {
          transform: rotate(-45deg);
        }
        .drag-area.bottom {
          transform: rotate(-135deg);
        }
      `}</style>
    </>
  );
};

export default AromaWheel;
