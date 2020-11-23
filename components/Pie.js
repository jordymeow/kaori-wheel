import Slice from './Slice';
import { LabelTypes } from './Label';

const Pie = (props) => {
  const { labels, hole, radius, data, stroke, strokeWidth, diameter } = props;
	const sum = data.map(v => v.value || 1).reduce((a, b) => a + b, 0);
  let startAngle = 0;

  return (
    <>
      {data.map((slice, _) => {
        const value = slice.value || 1;
        const nextAngle = startAngle;
        const angle = (value / sum) * 360;
        const percent = (value / sum) * 100;
        const key = Math.random().toString(36).substring(5);
        startAngle += angle;

        return <Slice
          key={key}
          id={key}
          value={value}
          percent={percent}
          percentValue={percent.toFixed(1)}
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
        />
      }) }
      <style jsx>{`
        text {
          font-family: Helvetica, Arial, sans-serif;
          font-weight: bolder;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}

export default Pie;