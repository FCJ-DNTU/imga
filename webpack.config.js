const path = require("path");

// Import plugins
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Name of pages must be matched with html files in gui directory
const _PAGES = ["index"];
const _ENTRY = "./gui/js";
const _DESTINATION = "build/gui";

module.exports = {
  entry: _PAGES.reduce((result, pageName) => {
    result[pageName] = _ENTRY + `/${pageName}/${pageName}.js`;
    return result;
  }, {}),
  output: {
    filename: `js/[name]/[name].js`,
    path: path.resolve(__dirname, _DESTINATION),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "gui/css", to: "css" },
        ..._PAGES.map((namePage) => ({
          from: `gui/${namePage}.html`,
        })),
      ],
    }),
  ],
};
