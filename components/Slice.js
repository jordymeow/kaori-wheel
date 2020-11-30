import { useEffect, useRef, useState } from 'react';
import { Label } from './Label';
import { getAnglePoint } from './../helpers/coordinate';

const Slice = (props) => {
  const { angle, startAngle, radius, hole, fill, stroke,
    strokeWidth, diameter, showLabel, selected, onSelect, onUnselect } = props;

  const [path, setPath] = useState('');

  useEffect(() => {
    draw();
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    draw();
  }, [props]);

  const draw = () => {
    const path = [];

    const diff = (diameter - (radius * 2)) / 2;
    const x = radius + diff;
    const y = radius + diff;
    const endAngle = startAngle + angle;
    const a = getAnglePoint(startAngle, endAngle, radius, x, y);
    const b = getAnglePoint(startAngle, endAngle, radius - hole, x, y);

    path.push(`M${a.x1},${a.y1}`);
    path.push(`A${radius},${radius} 0 ${angle > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);
    path.push(`L${b.x2},${b.y2}`);
    path.push(`A${radius - hole},${radius - hole} 0 ${angle > 180 ? 1 : 0},0 ${b.x1},${b.y1}`);
    path.push('Z');

    setPath(path.join(' '));
  };

  const onClick = () => {
    selected ? onUnselect() : onSelect();
  }

  return (
    <g overflow="hidden" onClick={onClick}>
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth ? strokeWidth : 3}
      />
      {showLabel && <Label {...props} />}
    </g>
  );
}

export default Slice;
