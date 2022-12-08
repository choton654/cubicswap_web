const { withExpo } = require("@expo/next-adapter");
const withFonts = require("next-fonts");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const withTM = require("next-transpile-modules")([
  "react-native-web",
  "native-base",
  "@pusher/push-notifications-web",
]);

module.exports = withPlugins(
  [
    withTM,
    withFonts,
    withImages,
    [withExpo, { projectRoot: __dirname }],
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          disable: process.env.NODE_ENV === "development",
          register: true,
          skipWaiting: true,
        },
      },
    ],
  ],
  {
    poweredByHeader: false,
    compress: false,
    images: {
      loader: "cloudinary",
      path: "https://res.cloudinary.com/choton/image/upload/",
      disableStaticImages: true,
    },
    reactStrictMode: true,
    buildActivityPosition: "bottom-right",
    webpack: config => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "react-native$": "react-native-web",
      };
      config.resolve.extensions = [".web.js", ".web.ts", ".web.tsx", ".web.jsx", ...config.resolve.extensions];
      return config;
    },
  }
);

// "react-native-svg",
// "react-native-safe-area-context",
// "@react-aria/visually-hidden",
// "@react-native-aria/button",
// "@react-native-aria/checkbox",
// "@react-native-aria/combobox",
// "@react-native-aria/focus",
// "@react-native-aria/interactions",
// "@react-native-aria/listbox",
// "@react-native-aria/overlays",
// "@react-native-aria/radio",
// "@react-native-aria/slider",
// "@react-native-aria/tabs",
// "@react-native-aria/utils",
// "@react-stately/combobox",
// "@react-stately/radio",
// webpack5: false,
