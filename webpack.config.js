const path = require("path"); // to handle file paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // generates HTML files and inject bundles
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extracts CSS into separate files.
const EsLintPlugin = require("eslint-webpack-plugin"); // integrate ESLint

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].bundle.js", // naming pattern for output files
    path: path.resolve(__dirname, "dist"), // output directory(dist) for the bundled files
  },
  plugins: [
    new EsLintPlugin(), // initializes ESLint to lint code
    new HtmlWebpackPlugin({
      // generate the HTML and automatically inject the 'script' tags into the 'body' or 'head'. updates the 'src' attribute of 'link' tags for your CSS bundles
      template: "./src/index.html", // use template HTML(./src/index.html)
      filename: "index.html", // output index.html
    }),
    new MiniCssExtractPlugin(), // MiniCssExtractPlugin: extract CSS into separate files. Prevents style flickering when navigating pages/routes
  ],
  // development server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // directory to serve static files from
    },
    port: 9000, // port for the development server
    open: true, // automatically open the browser after the server starts
    historyApiFallback: true, // support for SPAs with a fallback to index.html for navigation; client-side routing not traditional routing where there are files in the server which matches the routes
  },
  module: {
    // rules on how to handle different file types
    rules: [
      {
        test: /\.(js|jsx)$/, // match .js or .jsx files
        include: path.resolve(__dirname, "src"), // include the src folder
        exclude: path.resolve(__dirname, "node_modules"), // exclude node_modules folder
        use: [
          {
            loader: "babel-loader", // converts .js | .jsx files using Babel and webpack
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
          {
            //
            loader: "eslint-loader",
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.css$/, // match .css file
        use: [
          // MiniCssExtractPlugin: extract CSS from HTML. can prevent flickering when navigating pages/routes
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              // polyfills for cross-browser compatibility
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
                // instead of ["postcss-preset-env", {}], just use "autoprefixer" // shorthand notation for postcss-preset-env
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/, // match .sasss or .scss files
        use: [
          // MiniCssExtractPlugin: extract CSS from HTML. can prevent flickering when navigating pages/routes
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
                // instead of ["postcss-preset-env", {}], just use "autoprefixer" // shorthand notation for postcss-preset-env
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        // handling and optimization of various assets like images, fonts, stylesheets, and other non-JavaScript files in a web application.
        test: /\.(jpg|png|jpeg|gif)$/, // match .jpg | .png | .jpeg | .gif files
        type: "asset/resource", // module type to asset/resource
      },
    ],
  },
  optimization: {
    //  code splitting: splits the code into different bundles that can then be loaded on demand or in parallel, improving load time(s)
    splitChunks: {
      // configures how chunks are generated; apply optimization strategies to all chunks
      /**
       * Initial chunks:    chunks that are loaded initially when the application starts
       * Async chunks:      chunks loaded asynchronously, such as those used with dynamic imports
       * Non-async chunks:  chunks that aren't loaded asynchronously
       */
      chunks: "all",
    },
  },
};
