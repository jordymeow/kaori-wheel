import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Pie from './Pie';
import { LabelTypes, LabelAligns } from './Label';

const DragPosition = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
};
const DragState = {
  down: 'down',
  up: 'up'
};

const AromaWheel = (props) => {
  const { aromas, aromaGroups, onSelect, onUnselect } = props;
  const diameter = 800;
  const [{ x, previousX, currentPosition, previousDown }, set] = useSpring(() => ({ x: 0, previousX: 0, previousDown: DragState.up, currentPosition: DragPosition.top, config: { friction: 70, tension: 250 } }))

  const horizontalDragPositions = [
    DragPosition.right,
    DragPosition.left
  ];
  const clockwiseDragPositions = [
    DragPosition.top,
    DragPosition.right
  ];
  const bind = useDrag(
    ({ down, movement: [mx, my], xy: [posX, posY] }) => {
      let position = currentPosition.value;
      if (previousDown.value === DragState.up && down) {
        position = posY < (diameter / 5) ? DragPosition.top
          : (posY > diameter * ( 4 / 5 ) ? DragPosition.bottom : false);
        if (!position) {
          position = posX < (diameter / 2) ? DragPosition.left : DragPosition.right;
        }
      }
      const targetMovement = horizontalDragPositions.includes(position) ? my : mx;
      const calculatedX = targetMovement / 200;
      const nextPreviousX = clockwiseDragPositions.includes(position) ? previousX.value + calculatedX : previousX.value - calculatedX;
      const x = clockwiseDragPositions.includes(position) ? previousX.value + calculatedX : previousX.value - calculatedX;
      set({
        previousX: down ? previousX.value : nextPreviousX,
        previousDown: down ? DragState.down : DragState.up,
        currentPosition: position,
        x,
      });
    }
  );

  const retrieveGroupName = (aroma) => {
    return aromas.find(v => v.children.some(c => c.name === aroma)).name;
  }

  const onAromaSelect = (name) => {
    if (onSelect) {
      onSelect({ aroma: name, group: retrieveGroupName(name) });
    }
  }

  const onAromaUnselect = (name) => {
    if (onUnselect) {
      onUnselect({ aroma: name, group: retrieveGroupName(name) });
    }
  }

  // Pie Data
  const parentsData = aromas.map(v => {
    return {
      ...v,
      value: v.children.length,
      labelColor: '#fff',
      showLabel: !(v.children.some(v => v.selected))
    };
  });
  const chirdrenData = aromas.flatMap(v => v.children);
  const innerParentsData = parentsData.map(v => {
    return {
      ...v,
      labelType: LabelTypes.horizontal,
      labelAlign: LabelAligns.middle,
      showLabel: true
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
        <animated.div
          {...bind()}
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
              onSelect={onAromaSelect}
              onUnselect={onAromaUnselect}
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
      `}</style>
    </>
  );
};

export default AromaWheel;
