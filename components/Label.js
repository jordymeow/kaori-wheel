import { useEffect, useState } from "react";
import { getCoordinate, getAnglePoint } from './../helpers/coordinate';
import Heart from "./Heart";

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
    labelColor = "#fff", labelSize = "smaller", percent, percentValue,
    value, id, diameter, selected } = props;

  const text = label ? label : percent ? percentValue + "%" : value;
  const [textPath, setTextPath] = useState("");
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [textAnchor, setTextAnchor] = useState("");
  const [startOffset, setStartOffset] = useState(0);
  const [selectedLabelPoint, setSelectedLabelPoint] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    draw();
    setDefaultStyle();
    setCustomeStyle();
  }, []);

  const setStyle = ({dx, dy, textAnchor, startOffset}) => {
    setDx(dx);
    setDy(dy);
    setTextAnchor(textAnchor);
    setStartOffset(startOffset);
  };

  const draw = () => {
    const diff = (diameter - radius * 2) / 2;
    const x = radius + diff;
    const y = radius + diff;

    if (labelType === LabelTypes.along) {
      const a = getAnglePoint(startAngle, startAngle + angle, radius, x, y);
      const pathForText = [];
      pathForText.push(`M${a.x1},${a.y1}`);
      pathForText.push(`A${radius},${radius} 0 ${angle > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);
      setTextPath(pathForText.join(" "));
      return;
    }

    if (labelType === LabelTypes.horizontal) {
      const endPoint = getCoordinate(startAngle + angle / 2, radius, x, y);
      const startPoint = getCoordinate(startAngle + angle / 2, radius - hole, x, y);
      const pathForText = [];
      pathForText.push(`M${startPoint.x1},${startPoint.y1}`);
      pathForText.push(`L${endPoint.x1},${endPoint.y1}`);
      setTextPath(pathForText.join(" "));
    }

    if (selected) {
      const selectedLabelPoint = getCoordinate(startAngle + angle / 2, radius + 10, x, y);
      setSelectedLabelPoint({ x: selectedLabelPoint.x1, y: selectedLabelPoint.y1 + 5});
    }
  };

  const setDefaultStyle = () => {
    if (labelAlign) return;

    setStyle(defaultStyles[labelType]);
  }

  const setCustomeStyle = () => {
    if (!labelAlign) return;

    setStyle(customeStyles[labelType][labelAlign]);
  }

  return (
    <>
      <defs>
        <path id={id} d={textPath} />
      </defs>
      <text fill={labelColor} textAnchor={textAnchor} fontSize={labelSize}>
        <textPath xlinkHref={`#${id}`} startOffset={startOffset}>
          <tspan dx={dx} dy={dy}>
            {text}
          </tspan>
        </textPath>
      </text>
      {selected && <Heart id={id} x={selectedLabelPoint.x} y={selectedLabelPoint.y} diameter="10" />}
    </>
  );
};

export { Label, LabelTypes, LabelAligns };
