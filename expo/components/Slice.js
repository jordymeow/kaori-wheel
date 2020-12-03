import React, { useMemo } from 'react';
import { Label } from './Label';
import { getAnglePoint, getCoordinate } from './../helpers/coordinate';
import Heart from "./Heart";
import { G, Path } from 'react-native-svg';

const Slice = (props) => {
  const { angle, startAngle, radius, hole, fill, stroke, id,
    strokeWidth, diameter, showLabel, selected, onSelect, onUnselect,
    label, labelType, labelColor, labelSize, labelAlign, value } = props;

  // ------------------------
  // Common variables
  // ------------------------
  const diff = (diameter - (radius * 2)) / 2;
  const x = radius + diff;
  const y = radius + diff;

  // ------------------------
  // Path settings
  // ------------------------
  const draw = ({angle, startAngle, radius, hole, x, y}) => {
    const path = [];

    const endAngle = startAngle + angle;
    const a = getAnglePoint(startAngle, endAngle, radius, x, y);
    const b = getAnglePoint(startAngle, endAngle, radius - hole, x, y);

    path.push(`M${a.x1},${a.y1}`);
    path.push(`A${radius},${radius} 0 ${angle > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);
    path.push(`L${b.x2},${b.y2}`);
    path.push(`A${radius - hole},${radius - hole} 0 ${angle > 180 ? 1 : 0},0 ${b.x1},${b.y1}`);
    path.push('Z');

    return path.join(' ');
  }

  // ------------------------
  // Actions
  // ------------------------
  const onClick = () => {
    selected ? onUnselect() : onSelect();
  }

  // ------------------------
  // JSX with useMemo
  // ------------------------
  const labelJsx = useMemo(() => {
    if (!showLabel) return null;

    return <Label angle={angle} startAngle={startAngle} radius={radius} hole={hole} label={label} labelType={labelType}
      labelAlign={labelAlign} labelColor={labelColor} labelSize={labelSize} value={value} id={id} diameter={diameter} />
  }, [showLabel]);

  const selectedJsx = useMemo(() => {
    if (!selected) return null;

    const selectedLabelPoint = getCoordinate(startAngle + angle / 2, radius + 10, x, y);
    return <Heart id={id} x={selectedLabelPoint.x1} y={selectedLabelPoint.y1 + 5} diameter="10" />
  }, [selected, startAngle, angle, radius, x, y]);

  return (
    <G overflow="hidden" onClick={onClick}>
      <Path
        d={draw({angle, startAngle, radius, hole, x, y})}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth ? strokeWidth : 3}
      />
      {labelJsx}
      {selectedJsx}
    </G>
  );
}

export default Slice;
