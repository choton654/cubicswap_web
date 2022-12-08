import * as React from "react";
import { Marker } from "react-map-gl";
import { Icon } from "react-native-elements/dist/icons/Icon";

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props) {
  const { data, onClick } = props;

  return data.map((city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={city?.geocodeAddress?.coordinates[0]}
      latitude={city?.geocodeAddress?.coordinates[1]}
    >
      <Icon
        name="store"
        type="material"
        color="#d00"
        size={20}
        onPress={() => onClick(city)}
        style={{
          cursor: "pointer",
          stroke: "none",
          transform: [
            {
              // translateX: 30 / 2,
              // translateY: 30,
              // scale: 10,
              // scaleX: 5,
              // scaleY: 5,
            },
          ],
          // transform: `translate(${-30 / 2}px,${-30}px)`,
        }}
      />
    </Marker>
  ));
}

export default React.memo(Pins);

// const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//   c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//   C20.1,15.8,20.2,15.8,20.2,15.7z`;

// const SIZE = 20;

// <svg
//   height={SIZE}
//   viewBox="0 0 24 24"
// style={{
//   cursor: "pointer",
//   fill: "#d00",
//   stroke: "none",
//   transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
// }}
//   onClick={() => onClick(city)}
// >
//   <path d={ICON} />
// </svg>;
