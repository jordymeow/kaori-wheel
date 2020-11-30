import { getCoordinate, getAnglePoint } from './../helpers/coordinate';

const LabelTypes = {
  along: "along",
  horizontal: "horizontal",
};

const LabelAligns = {
  start: "start",
  middle: "middle",
  end: "end",
};

const Label = (props) => {
  const { angle, startAngle, radius, hole, label, labelType, labelAlign,
    labelColor = "#fff", labelSize = "smaller", value, id, diameter } = props;

  const text = label ? label : value;

  // Custom styles
  const commonDx = 5;
  const horizontalDy = 3;
  const alongDy = hole / 2;
  const customeStyles = {
    [LabelTypes.along]: {
      [LabelAligns.middle]: { dx: 0, dy: alongDy, textAnchor: 'middle', startOffset: '50%'},
      [LabelAligns.start]: { dx: commonDx, dy: alongDy, textAnchor: 'start', startOffset: '0%'},
      [LabelAligns.end]: { dx: -commonDx, dy: alongDy, textAnchor: 'end', startOffset: '100%'}
    },
    [LabelTypes.horizontal]: {
      [LabelAligns.middle]: { dx: 0, dy: horizontalDy, textAnchor: 'middle', startOffset: '50%'},
      [LabelAligns.start]: { dx: commonDx, dy: horizontalDy, textAnchor: 'start', startOffset: '0%'},
      [LabelAligns.end]: { dx: -commonDx, dy: horizontalDy, textAnchor: 'end', startOffset: '100%'}
    }
  };

  // Default styles
  const defaultStyles = {
    [LabelTypes.along] : { dx: 0, dy: 18, textAnchor: 'middle', startOffset: '50%'},
    [LabelTypes.horizontal] : { dx: -commonDx, dy: horizontalDy, textAnchor: 'end', startOffset: '100%'}
  };

  const draw = ({labelType, startAngle, angle, diameter, radius}) => {
    const diff = (diameter - radius * 2) / 2;
    const x = radius + diff;
    const y = radius + diff;

    if (labelType === LabelTypes.along) {
      const a = getAnglePoint(startAngle, startAngle + angle, radius, x, y);
      const pathForText = [];
      pathForText.push(`M${a.x1},${a.y1}`);
      pathForText.push(`A${radius},${radius} 0 ${angle > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);
      return pathForText.join(" ");
    }

    if (labelType === LabelTypes.horizontal) {
      const endPoint = getCoordinate(startAngle + angle / 2, radius, x, y);
      const startPoint = getCoordinate(startAngle + angle / 2, radius - hole, x, y);
      const pathForText = [];
      pathForText.push(`M${startPoint.x1},${startPoint.y1}`);
      pathForText.push(`L${endPoint.x1},${endPoint.y1}`);
      return pathForText.join(" ");
    }
  };

  const { dx, dy, textAnchor, startOffset } = labelAlign ? customeStyles[labelType][labelAlign]: defaultStyles[labelType];

  return (
    <>
      <defs>
        <path id={id} d={draw({labelType, startAngle, angle, diameter, radius})} />
      </defs>
      <text fill={labelColor} textAnchor={textAnchor} fontSize={labelSize}>
        <textPath xlinkHref={`#${id}`} startOffset={startOffset}>
          <tspan dx={dx} dy={dy}>
            {text}
          </tspan>
        </textPath>
      </text>
    </>
  );
};

export { Label, LabelTypes, LabelAligns };
