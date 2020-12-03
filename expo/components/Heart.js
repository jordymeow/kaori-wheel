import { Defs, G, Path, Use } from 'react-native-svg';

const Heart = (props) => {
  const { id, x, y, diameter, color = "#fff" } = props;
  const radius = diameter / 2;
  return (
    <>
      <Defs>
        <G id={`${id}-heart`}>
          <Path d={`M${x} ${y} v-${diameter} h${diameter}
            a${radius},${radius} ${radius - 10} 0,1 0,${diameter}
            a${radius},${radius} ${radius - 10} 0,1 -${diameter},0
            z`} />
        </G>
      </Defs>
      <Use xlinkHref={`#${id}-heart`} className="outline" fill={color} style={{ stroke: "none", strokeWidth: 0 }} />
    </>
  );
}

export default Heart;
