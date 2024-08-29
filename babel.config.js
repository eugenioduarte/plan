module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@hooks": "./src/hooks",
            "@locales": "./src/locales",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@utils": "./src/utils",
          },
        },
      ],
      require.resolve("expo-router/babel"),
    ],
  };
};
