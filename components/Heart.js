const Heart = (props) => {
  const { id, x, y, diameter, color = "#fff" } = props;
  const radius = diameter / 2;
  return (
    <>
      <defs>
        <g id={`${id}-heart`}>
          <path d={`M${x} ${y} v-${diameter} h${diameter}
            a${radius},${radius} ${radius - 10} 0,1 0,${diameter}
            a${radius},${radius} ${radius - 10} 0,1 -${diameter},0
            z`} />
        </g>
      </defs>
      <use xlinkHref={`#${id}-heart`} className="outline" fill={color} />
      <style jsx>{`
        .outline {
          stroke: none;
          stroke-width: 0;
        }
      `}</style>
    </>
  );
}

export default Heart;
