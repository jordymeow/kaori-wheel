import React from 'react';
import Slice from './Slice';
import { LabelTypes } from './Label';

const Pie = (props) => {
  const { labels, hole, radius, data, stroke, strokeWidth, diameter, onSelect, onUnselect } = props;
	const sum = data.map(v => v.value || 1).reduce((a, b) => a + b, 0);
  let startAngle = 0;

  const onBindSelect = (name) => {
    if (onSelect) {
      onSelect(name);
    }
  };

  const onBindUnselect = (name) => {
    if (onUnselect) {
      onUnselect(name);
    }
  };

  return (
    <>
      {data.map((slice, _) => {
        const value = slice.value || 1;
        const nextAngle = startAngle;
        const angle = (value / sum) * 360;
        const key = Math.random().toString(36).substring(5);
        startAngle += angle;

        return <Slice
          key={key}
          id={key}
          value={value}
          startAngle={nextAngle}
          angle={angle}
          diameter={diameter || (radius * 2)}
          radius={radius}
          hole={radius - hole}
          showLabel={slice.showLabel ?? labels}
          label={slice.name}
          labelColor={slice.labelColor}
          labelType={slice.labelType || LabelTypes.horizontal}
          labelAlign={slice.labelAlign}
          labelSize={slice.labelSize}
          fill={slice.color}
          stroke={stroke}
          strokeWidth={strokeWidth}
          selected={slice.selected ?? false}
          onSelect={() => onBindSelect(slice.name)}
          onUnselect={() => onBindUnselect(slice.name)}
        />
      }) }
    </>
  );
}

export default Pie;