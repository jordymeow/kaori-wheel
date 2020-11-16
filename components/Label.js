import { useEffect, useState } from "react";

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
  const { angle, startAngle, radius, hole, label,
    labelType, labelAlign, labelColor = "#fff", labelSize = "smaller",
    percent, percentValue, value, id, diameter } = props;

  const text = label ? label : percent ? percentValue + "%" : value;
  const [textPath, setTextPath] = useState("");
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [textAnchor, setTextAnchor] = useState("");
  const [startOffset, setStartOffset] = useState("");

  const getCoordinate = (angle, radius, x, y) => {
    const x1 = x + radius * Math.cos((Math.PI * angle) / 180);
    const y1 = y + radius * Math.sin((Math.PI * angle) / 180);
    return { x1, y1 };
  };

  const getAnglePoint = (startAngle, endAngle, radius, x, y) => {
    const { x1, y1 } = getCoordinate(startAngle, radius, x, y);
    const { x1: x2, y1: y2 } = getCoordinate(endAngle, radius, x, y);

    return { x1, y1, x2, y2 };
  };

  useEffect(() => {
    draw();
    setDefaultStyle();
    setCustomeStyle();
  }, []);

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
      if (startAngle > 180) {
        pathForText.push(`M${endPoint.x1},${endPoint.y1}`);
        pathForText.push(`L${startPoint.x1},${startPoint.y1}`);
      } else {
        pathForText.push(`M${startPoint.x1},${startPoint.y1}`);
        pathForText.push(`L${endPoint.x1},${endPoint.y1}`);
      }
      setTextPath(pathForText.join(" "));
    }
  };

  const setDefaultStyle = () => {
    if (labelAlign) return;

    if (labelType === LabelTypes.along) {
      setDx(0);
      setDy(18);
      setTextAnchor("middle");
      setStartOffset("50%");
    } else if (labelType === LabelTypes.horizontal) {
      if (startAngle > 180) {
        setDx(5);
        setDy(3);
        setTextAnchor("start");
        setStartOffset("0%");
      } else {
        setDx(-5);
        setDy(3);
        setTextAnchor("end");
        setStartOffset("100%");
      }
    }
  }

  const setCustomeStyle = () => {
    if (!labelAlign) return;

    if (labelType === LabelTypes.along) {
      if (labelAlign === LabelAligns.middle) {
        setDx(0);
        setDy(hole/2);
        setTextAnchor("middle");
        setStartOffset("50%");
      } else if (labelAlign === LabelAligns.start) {
        setDx(5);
        setDy(3);
        setTextAnchor("start");
        setStartOffset("0%");
      } else if (labelAlign == LabelAligns.end) {
        setDx(-5);
        setDy(3);
        setTextAnchor("end");
        setStartOffset("100%");
      }
    } else if (labelType === LabelTypes.horizontal) {
      if (labelAlign === LabelAligns.middle) {
        setDx(0);
        setDy(3);
        setTextAnchor("middle");
        setStartOffset("50%");
      } else if (labelAlign === LabelAligns.start) {
        setDx(5);
        setDy(3);
        setTextAnchor("start");
        setStartOffset("0%");
      } else if (labelAlign == LabelAligns.end) {
        setDx(-5);
        setDy(3);
        setTextAnchor("end");
        setStartOffset("100%");
      }
    }
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
    </>
  );
};

export { Label, LabelTypes, LabelAligns };
