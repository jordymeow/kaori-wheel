import { useEffect, useRef, useState } from 'react';

const Slice = (props) => {
  const { angle, startAngle, radius, hole, showLabel, label, labelType = 'along',
    labelColor = '#fff', trueHole, fill, stroke, strokeWidth, percent, percentValue,
    value, id, diameter } = props;

  const text = label ? label : (percent ? percentValue + '%' : value);
  const [path, setPath] = useState('');
  const [textPath, setTextPath] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const labelTypes = {
    along: 'along',
    horizontal: 'horizontal'
  };

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
		// if (!this.isMounted()) {
		// 	return;
		// }

    const path = [];
		const step = angle / (37.5 / 2);

		if (s + step > angle) {
			s = angle;
		}

    // Get angle points
    const diff = (diameter - (radius * 2)) / 2;
		const a = getAnglePoint(startAngle, startAngle + s, radius, radius + diff, radius + diff);
		const b = getAnglePoint(startAngle, startAngle + s, radius - hole, radius + diff, radius + diff);

		path.push(`M${a.x1},${a.y1}`);
    path.push(`A${radius},${radius} 0 ${s > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);

    // For text path along the circle.
    if (showLabel && labelType === labelTypes.along)
      setTextPath(path.join(' '));

		path.push(`L${b.x2},${b.y2}`);
		path.push(`A${radius - hole},${radius- hole} 0 ${s > 180 ? 1 : 0},0 ${b.x1},${b.y1}`);

		// Close
    path.push('Z');

    setPath(path.join(' '));

		if (s < angle) {
			setTimeout(() => { draw(s + step) } , 16);
		} else if (showLabel) {
			// const c = getAnglePoint(startAngle, startAngle + (angle / 2), (radius / 2 + trueHole / 2), radius, radius);
      // setX(c.x2);
      // setY(c.y2);
      const dx = (hole - 16) / 2;
      setX(dx);
		}
  };

  const getAnglePoint = (startAngle, endAngle, radius, x, y) => {
    let x1, y1, x2, y2;

    x1 = x + radius * Math.cos(Math.PI * startAngle / 180);
    y1 = y + radius * Math.sin(Math.PI * startAngle / 180);
    x2 = x + radius * Math.cos(Math.PI * endAngle / 180);
    y2 = y + radius * Math.sin(Math.PI * endAngle / 180);

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
      {showLabel ?
        <>
          <defs>
            <path id={id} d={textPath} />
          </defs>
          <text fill={labelColor} textAnchor="middle">
            <textPath xlinkHref={`#${id}`} startOffset="50%">
              <tspan dy={18}>
                {text}
              </tspan>
            </textPath>
          </text>
        </>
      : null}
    </g>
  );
}

export default Slice;
