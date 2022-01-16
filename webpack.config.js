const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  const isDev = env.mode === "development";
  return {
    entry: "./src/index.ts",
    mode: isDev ? "development" : "production",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
    target: "node",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts"],
    },
    plugins: [
      new ESLintPlugin({
        extensions: "ts",
      }),
    ],
  };
};
