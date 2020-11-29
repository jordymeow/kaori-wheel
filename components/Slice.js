import { useEffect, useRef, useState } from 'react';
import { Label } from './Label';
import { getAnglePoint } from './../helpers/coordinate';

const Slice = (props) => {
  const { angle, startAngle, radius, hole, fill, stroke,
    strokeWidth, diameter, showLabel, selected, onSelect, onUnselect } = props;

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
    // Jordy: Now calling directly draw... to draw everything at once (to avoid the animation)
		draw(360);
	};

  const draw = (s) => {
    const path = [];
		const step = angle / (37.5 / 2);

		if (s + step > angle) {
			s = angle;
    }

    const diff = (diameter - (radius * 2)) / 2;
    const x = radius + diff;
    const y = radius + diff;
		const a = getAnglePoint(startAngle, startAngle + s, radius, x, y);
		const b = getAnglePoint(startAngle, startAngle + s, radius - hole, x, y);

		path.push(`M${a.x1},${a.y1}`);
    path.push(`A${radius},${radius} 0 ${s > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);
		path.push(`L${b.x2},${b.y2}`);
		path.push(`A${radius - hole},${radius- hole} 0 ${s > 180 ? 1 : 0},0 ${b.x1},${b.y1}`);
    path.push('Z');

    setPath(path.join(' '));

    // No need since we draw it right away.
		// if (s < angle) {
		// 	setTimeout(() => { draw(s + step) } , 16);
		// }
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
