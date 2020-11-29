import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Pie from './Pie';
import { LabelTypes, LabelAligns } from './Label';
import { useEffect, useMemo, useState, useRef } from 'react';

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
  const [{ x, previousX, currentPosition, previousDown }, set] = useSpring(() => ({ x: 0, previousX: 0, previousDown: DragState.up, currentPosition: DragPosition.top, config: { friction: 70, tension: 250 } }));
  const [ outsideParentsData, setOutsideParentsData ] = useState([]);
  const [ childrenData, setChildrenData ] = useState([]);
  const [ insideParentsData, setInsideParentsData ] = useState([]);
  const [ groupData, setGroupData ] = useState([]);

  const horizontalDragPositions = [
    DragPosition.right,
    DragPosition.left
  ];
  const clockwiseDragPositions = [
    DragPosition.top,
    DragPosition.right
  ];

  // --------------------
  // Animation Settings
  // --------------------
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

  // --------------------
  // Select/Unselect
  // --------------------
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

  // --------------------
  // Pie Data
  // --------------------
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current && aromas && aromaGroups) {
      isFirstRun.current = false;
      const newAromas = makeOutsideParentsData(aromas);
      setOutsideParentsData(newAromas);
      setChildrenData(makeChildrenData(newAromas));
      setInsideParentsData(makeInsideParentsData(newAromas));
      setGroupData(makeGroupData(newAromas, aromaGroups));
      return;
    }
    if (aromas && aromaGroups) {
      const newAromas = makeOutsideParentsData(aromas);
      setOutsideParentsData(newAromas);
      setChildrenData(makeChildrenData(newAromas));
    }
  }, [aromas, aromaGroups]);

  const makeOutsideParentsData = (aromas) => {
    return aromas.map(v => {
      return {
        ...v,
        value: v.children.length,
        labelColor: '#fff',
        showLabel: !(v.children.some(v => v.selected))
      };
    });
  };
  const makeChildrenData = (aromas) => aromas.flatMap(v => v.children);
  const makeInsideParentsData = (aromas) => {
    return aromas.map(v => {
      return {
        ...v,
        labelType: LabelTypes.horizontal,
        labelAlign: LabelAligns.middle,
        showLabel: true
      }
    })
  };
  const makeGroupData = (aromas, aromaGroups) => {
    return aromaGroups.map(v => {
      return {
        ...v,
        labelAlign: LabelAligns.middle,
        value: aromas.filter(d => v.children.includes(d.name))
                .flatMap(d => d.children)
                .length
      };
    });
  };

  // --------------------
  // Pie JSX
  // --------------------
  const outsideParentsWheel = useMemo(() => {
    if (!outsideParentsData) return null;
    return (
      <Pie data={outsideParentsData} radius={400} hole={375} labels={true} strokeWidth={1} stroke={'#fff'} />
    )
  }, [outsideParentsData]);

  const childrenWheel = useMemo(() => {
    if (!childrenData) return null;
    return (
      <Pie data={childrenData} diameter={diameter} radius={375} hole={240} labels={true} onSelect={onAromaSelect} onUnselect={onAromaUnselect} />
    )
  }, [childrenData]);

  const insideParentsWheel = useMemo(() => {
    if (!insideParentsData) return null;
    return (
      <Pie data={insideParentsData} diameter={diameter} radius={240} hole={130} labels={true} strokeWidth={1} stroke={'#fff'} />
    )
  }, [insideParentsData]);

  const groupWheel = useMemo(() => {
    if (!groupData) return null;
    return (
      <Pie data={groupData} diameter={diameter} radius={130} hole={75} labels={true} strokeWidth={1} stroke={'#fff'} />
    )
  }, [groupData]);

  const centerWheel = useMemo(() => {
    if (!childrenData) return null;
    return (
      <Pie data={[{ value: childrenData.length, name: 'Center', color: '#fff' }]} diameter={diameter} radius={75} hole={0} labels={true} strokeWidth={1} stroke={'#fff'} />
    )
  }, [childrenData]);

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
            {outsideParentsWheel}
            {childrenWheel}
            {insideParentsWheel}
            {groupWheel}
            {centerWheel}
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
        * {
          user-select: none
        }
      `}</style>
    </>
  );
};

export default AromaWheel;
