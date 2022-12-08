import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { ScreenState } from "../../context/state/screenState";

const { width, height } = Dimensions.get("window");

function SingleImage({ item, toggleOverlay, overlay }) {
  const {
    screenWidth,
    screenHeight,
    show,
    smScreen,
    smSidebar,
    md,
    lgSidebar,
  } = ScreenState();

  const pinchScale = new Animated.Value(1);
  // const baseScale = new Animated.Value(1);
  // const scale = Animated.multiply(baseScale, pinchScale);
  // const lastScale = 1;

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    {
      useNativeDriver: true,
    }
  );

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // lastScale *= event.nativeEvent.scale;
      // baseScale.setValue(lastScale);
      // pinchScale.setValue(1);

      Animated.spring(pinchScale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 1,
      }).start();
    }
  };

  return (
    <>
      {overlay ? (
        <Animated.View style={{ flex: 1 }}>
          <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={onPinchHandlerStateChange}
          >
            <Animated.View
              collapsable={false}
              style={{
                ...StyleSheet.absoluteFill,
                ...styles.a,
              }}
            >
              <Animated.Image
                source={{ uri: item }}
                resizeMode="contain"
                style={[
                  {
                    width: screenWidth,
                    height: screenHeight * 0.9,
                  },
                  {
                    transform: [
                      { perspective: 200 },
                      {
                        scale: pinchScale,
                      },
                    ],
                  },
                ]}
              />
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      ) : (
        <TouchableOpacity onPress={toggleOverlay} style={styles.a}>
          <Image
            source={{ uri: item }}
            resizeMode="contain"
            style={{
              width: md
                ? screenWidth - lgSidebar
                : show
                ? screenWidth - smSidebar
                : screenWidth,
              height: screenHeight * 0.58,
            }}
            transition
            alt="pic"
          />
        </TouchableOpacity>
      )}
    </>
  );
}

export default SingleImage;

const styles = StyleSheet.create({
  a: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  oi: {
    width: width < 700 ? width : width - width * 0.2,
    height: height * 0.9,
  },
  i: {
    width,
    height: height * 0.58,
  },
});

// import React from "react";
// import {
//   Animated,
//   Dimensions,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import {
//   PanGestureHandler,
//   PinchGestureHandler,
//   RotationGestureHandler,
//   State,
// } from "react-native-gesture-handler";

// const { width, height } = Dimensions.get("window");

// export class PinchableBox extends React.Component {
//   panRef = React.createRef();
//   rotationRef = React.createRef();
//   pinchRef = React.createRef();
//   constructor(props) {
//     super(props);
//     this.imgW = this.props.overlay ? width : width * 0.9;
//     this.imgH = this.props.overlay ? height * 0.85 : height * 0.52;
//     /* Pinching */
//     this._baseScale = new Animated.Value(1);
//     this._pinchScale = new Animated.Value(1);
//     this._scale = Animated.multiply(this._baseScale, this._pinchScale);
//     this._lastScale = 1;
//     this._onPinchGestureEvent = Animated.event(
//       [{ nativeEvent: { scale: this._pinchScale } }],
//       { useNativeDriver: true }
//     );

//     /* Rotation */
//     this._rotate = new Animated.Value(0);
//     this._rotateStr = this._rotate.interpolate({
//       inputRange: [-100, 100],
//       outputRange: ["-100rad", "100rad"],
//     });
//     this._lastRotate = 0;
//     this._onRotateGestureEvent = Animated.event(
//       [{ nativeEvent: { rotation: this._rotate } }],
//       { useNativeDriver: true }
//     );

//     /* Tilt */
//     this._tilt = new Animated.Value(0);
//     this._tiltStr = this._tilt.interpolate({
//       inputRange: [-501, -500, 0, 1],
//       outputRange: ["1rad", "1rad", "0rad", "0rad"],
//     });
//     this._lastTilt = 0;
//     this._onTiltGestureEvent = Animated.event(
//       [{ nativeEvent: { translationY: this._tilt } }],
//       { useNativeDriver: true }
//     );
//   }

//   _onRotateHandlerStateChange = (event) => {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       this._lastRotate += event.nativeEvent.rotation;
//       this._rotate.setOffset(this._lastRotate);
//       this._rotate.setValue(0);
//     }
//   };
//   _onPinchHandlerStateChange = (event) => {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       this._lastScale *= event.nativeEvent.scale;
//       this._baseScale.setValue(this._lastScale);
//       this._pinchScale.setValue(1);
//     }
//   };
//   _onTiltGestureStateChange = (event) => {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       this._lastTilt += event.nativeEvent.translationY;
//       this._tilt.setOffset(this._lastTilt);
//       this._tilt.setValue(0);
//     }
//   };
//   render() {
//     return (
//       <>
//         {this.props.overlay ? (
//           <PanGestureHandler
//             ref={this.panRef}
//             onGestureEvent={this._onTiltGestureEvent}
//             onHandlerStateChange={this._onTiltGestureStateChange}
//             minDist={10}
//             minPointers={2}
//             maxPointers={2}
//             avgTouches
//           >
//             <Animated.View style={styles.wrapper}>
//               <RotationGestureHandler
//                 ref={this.rotationRef}
//                 simultaneousHandlers={this.pinchRef}
//                 onGestureEvent={this._onRotateGestureEvent}
//                 onHandlerStateChange={this._onRotateHandlerStateChange}
//               >
//                 <Animated.View style={styles.wrapper}>
//                   <PinchGestureHandler
//                     ref={this.pinchRef}
//                     simultaneousHandlers={this.rotationRef}
//                     onGestureEvent={this._onPinchGestureEvent}
//                     onHandlerStateChange={this._onPinchHandlerStateChange}
//                   >
//                     <Animated.View style={styles.container} collapsable={false}>
//                       <Animated.Image
//                         style={[
//                           { width: this.imgW, height: this.imgH },
//                           {
//                             transform: [
//                               { perspective: 200 },
//                               { scale: this._scale },
//                               { rotate: this._rotateStr },
//                               { rotateX: this._tiltStr },
//                             ],
//                           },
//                         ]}
//                         source={{ uri: this.props.item }}
//                       />
//                     </Animated.View>
//                   </PinchGestureHandler>
//                 </Animated.View>
//               </RotationGestureHandler>
//             </Animated.View>
//           </PanGestureHandler>
//         ) : (
//           <TouchableOpacity
//             onPress={this.props.toggleOverlay}
//             style={{
//               flex: 1,
//               width,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "#fff",
//             }}
//           >
//             <Image
//               source={{ uri: this.props.item }}
//               resizeMode="contain"
//               style={{
//                 width: this.imgW,
//                 height: this.imgH,
//               }}
//             />
//           </TouchableOpacity>
//         )}
//       </>
//     );
//   }
// }

// export default PinchableBox;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "black",
//     overflow: "hidden",
//     alignItems: "center",
//     flex: 1,
//     justifyContent: "center",
//   },
//   pinchableImage: {
//     width: 250,
//     height: 250,
//   },
//   wrapper: {
//     flex: 1,
//   },
// });
