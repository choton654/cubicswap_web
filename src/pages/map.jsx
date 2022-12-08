// import { jsx } from "@emotion/react";
import "mapbox-gl/dist/mapbox-gl.css";
import router from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  MapController,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { ssrClient } from "../client";
import Layout from "../components/Layout";
import Pins from "../components/Map.js/Pins";
import StoreInfo from "../components/Map.js/StoreInfo";
import { accentColor } from "../Constant/color";
import { ScreenState } from "../context/state/screenState";
import { GET_STORE_POINTS } from "../graphql/query";

export default function MapScreen({ data: getAllStores }) {
  const { show, screenWidth, screenHeight } = ScreenState();

  const mapRef = useRef(null);
  const mapController = useMemo(() => new MapController(), []);
  useEffect(() => {
    console.log(mapController);
    if (mapRef) {
      console.log(mapRef?.current?.getMap());
    }
  }, [mapController]);

  const [userLoaction, setUserLoaction] = useState(JSON.parse(window.localStorage.getItem("user_location")));

  const [viewport, setViewport] = useState({
    height: show ? screenHeight - 56 : screenHeight - 112,
    width: screenWidth,
    longitude: 88.352936,
    latitude: 22.560728,
    zoom: 14,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLoaction({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        localStorage.setItem(
          "user_location",
          JSON.stringify({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        );
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    if (window.localStorage.getItem("permission") !== "granted") {
      navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        if (result.state === "granted") {
          localStorage.setItem("permission", "granted");
        } else if (result.state === "prompt") {
          localStorage.setItem("permission", "prompted");
        } else if (result.state === "denied") {
          localStorage.setItem("permission", "denied");
          return;
        }
        result.onchange = function () {
          console.log("Permission " + result.state);
        };
      });
    }
  }, []);

  const geolocateStyle = {
    top: 0,
    left: 0,
    padding: "10px",
  };

  const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: "10px",
  };

  const navStyle = {
    top: 72,
    left: 0,
    padding: "10px",
  };

  return (
    <Layout title={"Map"}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ReactMapGL
          controller={mapController}
          ref={mapRef}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          mapboxApiAccessToken={
            "pk.eyJ1IjoiY2hvdG9uNjU0IiwiYSI6ImNrbHplZGJ4YjBpYXgybm82Z3FiZGg4aGcifQ.wSmhE4fTXoL30pmxurQQZw"
          }
          {...viewport}
          onViewportChange={nextViewport => setViewport(nextViewport)}>
          {getAllStores.length > 0 && (
            <View>
              <Pins data={getAllStores} onClick={setPopupInfo} />
            </View>
          )}
          {router.query.lat && router.query.lang && (
            <Marker
              latitude={parseFloat(router.query.lat)}
              longitude={parseFloat(router.query.lang)}
              offsetLeft={-20}
              offsetTop={-10}>
              <Icon name='store' type='material' color='#ff0' size={25} />
            </Marker>
          )}

          {popupInfo && (
            <View style={{ margin: 15 }}>
              <Popup
                tipSize={5}
                anchor='top'
                longitude={popupInfo.geocodeAddress?.coordinates[0]}
                latitude={popupInfo.geocodeAddress?.coordinates[1]}
                closeOnClick={false}
                onClose={setPopupInfo}>
                <StoreInfo info={popupInfo} />
              </Popup>
            </View>
          )}

          {userLoaction && (
            <>
              <Marker latitude={userLoaction.lat} longitude={userLoaction.long} offsetLeft={-20} offsetTop={-10}>
                <Icon name='emoji-people' type='material' color={accentColor} size={30} />
              </Marker>
              {/* <Popup
                tipSize={10}
                anchor="top"
                latitude={userLoaction.lat}
                longitude={userLoaction.long}
                closeOnClick={false}
                closeButton={false}
                dynamicPosition
              >
                <Text>You are here</Text>
              </Popup> */}
            </>
          )}

          <GeolocateControl style={geolocateStyle} />
          <FullscreenControl style={fullscreenControlStyle} />
          <NavigationControl style={navStyle} />
        </ReactMapGL>
      </View>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { getAllStores } = await ssrClient(null).request(GET_STORE_POINTS);

    return {
      props: {
        data: getAllStores || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
}

// <div
//       maxHeight={{ xs: 233, md: 167 }}
//       maxWidth={{ xs: 350, md: 250 }}
//       css={{
//         ".mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-bottom-right": {
//           display: "none",
//         },
//       }}
//       ></div>

//  {
//    getAllStores.map((geo, i) => (
//      <Marker
//        key={i}
//        latitude={geo?.geocodeAddress?.coordinates[1]}
//        longitude={geo?.geocodeAddress?.coordinates[0]}
//        offsetLeft={-20}
//        offsetTop={-10}
//      >
//        <Icon name="place" type="material" color="#ff0000" size={30} />
//      </Marker>
//    ));
//  }

//  <Marker
//    latitude={parseFloat(localStorage.getItem("user_location").lat)}
//    longitude={parseFloat(localStorage.getItem("user_location").long)}
//    offsetLeft={-20}
//    offsetTop={-10}
//  >
//    <Icon name="place" type="material" color="#ff0000" size={30} />
//  </Marker>;

// <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
//   <Feature coordinates={[22.560728, 88.352936]} />
// </Layer>;

// const [lng, setLng] = useState(-70.9);
// const [lat, setLat] = useState(42.35);
// const [zoom, setZoom] = useState(9);

// useEffect(() => {
//   const map = new mapboxgl.Map({
//     container: mapContainer.current,
//     style: "mapbox://styles/mapbox/streets-v11",
//     center: [lng, lat],
//     zoom: zoom,
//   });

//   const nav = new mapboxgl.NavigationControl();
//   map.addControl(nav);

//   map.on("move", () => {
//     setLng(map.getCenter().lng.toFixed(4));
//     setLat(map.getCenter().lat.toFixed(4));
//     setZoom(map.getZoom().toFixed(2));
//   });

//   map.addControl(
//     new mapboxgl.GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//     })
//   );
//   return () => map.remove();
// }, []);

// useEffect(() => {
//   if (router.query.lat && router.query.lang) {
//     setViewport({
//       ...viewport,
//       latitude: parseFloat(router.query.lat),
//       longitude: parseFloat(router.query.lang),
//     });
//   }
// }, [router]);
