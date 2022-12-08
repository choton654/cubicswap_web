// /* eslint-disable react/display-name */
// import router from "next/router";
// import { useEffect } from "react";
// import { UserState } from "../context/state/userState";

// const AuthHOC = (WrappedComponent) => {
//   return (props) => {
//     const {
//       state: { user: me, isAuthenticated },
//     } = UserState();

//     useEffect(() => {
//       if (isAuthenticated && me.shippingAddress === undefined) {
//         router.push("/address?type=checkout");
//       }
//     }, [me]);

//     return <WrappedComponent {...props} />;
//   };
// };

// export default AuthHOC;
