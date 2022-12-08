// @generated: @expo/next-adapter@2.1.77
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["@expo/next-adapter/babel", "next/babel"],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      // "react-native-reanimated/plugin",
      ["react-native-web", { commonjs: true }],
    ],
  };
};
// env: {
//   production: {
//     plugins: ["react-native-paper/babel"],
//   },
// },
// overrides: [
//   {
//     test: "./node_modules/@expo/next-adapter/document.js",
//     plugins: [["@babel/plugin-proposal-class-properties"]],
//   },
//   {
//     test: "./node_modules/react-native-animatable/*",
//     plugins: [["@babel/plugin-proposal-class-properties"]],
//   },
// ],
