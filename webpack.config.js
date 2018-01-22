const path = require('path');
__dirname = __dirname.charAt(0).toUpperCase() + __dirname.slice(1);
module.exports = {
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!
  entry: path.resolve(__dirname, 'app/scripts/cognito.js'),
  // Place output files in `./dist/my-app.js`
  output: {
    path: path.resolve(__dirname, 'app/scripts'),
    filename: 'cognito2.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }
    ]
},
  externals: {
      'crypto': 'crypto'
  }
};
