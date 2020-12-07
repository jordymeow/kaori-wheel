import React, { useEffect, useMemo, useState, useRef, useLayoutEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Pie from './Pie';
import { LabelTypes, LabelAligns } from './Label';
import Svg from 'react-native-svg';
import { View } from 'react-native';

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
  const ref = useRef();
  const { aromas, aromaGroups, onSelect, onUnselect, width } = props;
  const diameter = 800;
  const scale = width / diameter;
  const [ criteria, setCriteria ] = useState(props.criteria ?? { top: width / 5, bottom: width * (4 / 5), center: width / 2 });
  const [{ x, previousX, currentPosition, previousDown }, set] = useSpring(() => ({ x: 0, previousX: 0, previousDown: DragState.up, currentPosition: DragPosition.top, config: { friction: 70, tension: 0 } }));
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

  useLayoutEffect(() => {
    if (!props.criteria && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCriteria({ top: rect.y + criteria.top, bottom: rect.y + criteria.bottom, center: rect.x + (width / 2) });
    }
  }, []);

  // --------------------
  // Animation Settings
  // --------------------
  const bind = useDrag(
    ({ down, movement: [mx, my], xy: [posX, posY], velocity }) => {
      let position = currentPosition.value;
      if (previousDown.value === DragState.up && down) {
        position = posY < criteria.top ? DragPosition.top
          : (posY > criteria.bottom ? DragPosition.bottom : false);
        if (!position) {
          position = posX < criteria.center ? DragPosition.left : DragPosition.right;
        }
      }
      const targetMovement = horizontalDragPositions.includes(position) ? my : mx;
      const movementRate = down || velocity < 1 ? 200 : 100;
      const calculatedX = targetMovement / movementRate * scale;
      const nextPreviousX = clockwiseDragPositions.includes(position) ? previousX.value + calculatedX : previousX.value - calculatedX;
      const x = clockwiseDragPositions.includes(position) ? previousX.value + calculatedX : previousX.value - calculatedX;
      const config = { friction: 70, tension: down || velocity < 1 ? 0 : 300 };
      set({
        previousX: down ? previousX.value : nextPreviousX,
        previousDown: down ? DragState.down : DragState.up,
        currentPosition: position,
        x,
        config
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
      <View ref={ref} style={{ width: width, height: width, overflow: "hidden" }}>
        <View style={{ width: diameter, height: diameter, transform: `scale(${scale})`, transformOrigin: 'left top' }}>
          <animated.View
            {...bind()}
            style={{
              transform: x.interpolate((x) => `matrix3d(${Math.cos(-x)}, ${Math.sin(x)}, 0, 0, ${Math.sin(-x)}, ${Math.cos(-x)}, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`),
            }}
          >
            <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: "flex", justifyContent: "center", transform: "rotate(-90deg)" }}>
              {outsideParentsWheel}
              {childrenWheel}
              {insideParentsWheel}
              {groupWheel}
              {centerWheel}
            </Svg>
          </animated.View>
        </View>
      </View>
    </>
  );
};

export default AromaWheel;
