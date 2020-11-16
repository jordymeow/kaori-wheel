import { useEffect, useRef, useState } from 'react';
import { Label } from './Label';

const Slice = (props) => {
  const { angle, startAngle, radius, hole, fill, stroke, strokeWidth, diameter, showLabel } = props;

  const [path, setPath] = useState('');

  useEffect(() => {
    animate();
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setPath('');
    animate();
  }, [props]);

	const animate = () => {
		draw(0);
	};

  const draw = (s) => {
    const path = [];
		const step = angle / (37.5 / 2);

		if (s + step > angle) {
			s = angle;
    }

    // Get angle points
    const diff = (diameter - (radius * 2)) / 2;
    const x = radius + diff;
    const y = radius + diff;
		const a = getAnglePoint(startAngle, startAngle + s, radius, x, y);
		const b = getAnglePoint(startAngle, startAngle + s, radius - hole, x, y);

		path.push(`M${a.x1},${a.y1}`);
    path.push(`A${radius},${radius} 0 ${s > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);
		path.push(`L${b.x2},${b.y2}`);
		path.push(`A${radius - hole},${radius- hole} 0 ${s > 180 ? 1 : 0},0 ${b.x1},${b.y1}`);

		// Close
    path.push('Z');

    setPath(path.join(' '));

		if (s < angle) {
			setTimeout(() => { draw(s + step) } , 16);
		}
  };

  const getCoordinate = (angle, radius, x, y) => {
    const x1 = x + radius * Math.cos(Math.PI * angle / 180);
    const y1 = y + radius * Math.sin(Math.PI * angle / 180);
    return { x1, y1 }
  }

  const getAnglePoint = (startAngle, endAngle, radius, x, y) => {
    const { x1, y1 } = getCoordinate(startAngle, radius, x, y);
    const { x1: x2, y1: y2} = getCoordinate(endAngle, radius, x, y);

    return { x1, y1, x2, y2 };
  };

	return (
    <g overflow="hidden">
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
