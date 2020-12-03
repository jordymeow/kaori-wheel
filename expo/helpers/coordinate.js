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

export { getCoordinate, getAnglePoint };
