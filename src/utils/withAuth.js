// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { destroyCookie, parseCookies } from "nookies";
// import { BASE_URL } from "./baseUrl";

// export const withAuth = async (ctx) => {
//   const { token } = parseCookies(ctx);
//   if (!token) {
//     return {
//       me: null,
//       token: null,
//       isAuthenticated: false,
//     };
//   } else {
//     try {
//       // console.log("user and token", token);
//       const decode = jwt_decode(token);
//       const res = await axios.get(`${BASE_URL}/api/users/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // console.log(res.status, res.data);
//       if (res.status === 401 || !res.data || !res) {
//         return {
//           me: null,
//           token: null,
//           isAuthenticated: false,
//         };
//       }
//       // console.log("auth user", res.data.user);
//       if (decode.id === res.data.user._id) {
//         return {
//           me: res.data.user,
//           token: token,
//           isAuthenticated: true,
//         };
//       }
//     } catch (error) {
//       console.log(error);

//       destroyCookie(ctx, token);
//       return {
//         me: null,
//         token: null,
//         isAuthenticated: false,
//       };
//     }
//   }
// };

// export const redirect = (context, target) => {
//   if (context.req) {
//     context.res.writeHead(303, { Location: target });
//     context.res.end();
//     return;
//   } else {
//     Router.replace(target);
//     return;
//   }
// };
