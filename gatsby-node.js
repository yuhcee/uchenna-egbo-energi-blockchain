const webpack = require("webpack");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
      plugins: [
          new webpack.ProvidePlugin({
              Buffer: [require.resolve("buffer/"), "Buffer"],
              process: 'process/browser'
          }),
      ],
      resolve: {
          fallback: {
              "crypto": false,
              "stream": require.resolve("stream-browserify"),
              "assert": false,
              "util": false,
              "http": false,
              "https": false,
              "os": false
          },
      },
  })
}
