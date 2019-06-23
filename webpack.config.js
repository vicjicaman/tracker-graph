const pkgjson = require("./package.json");
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const NodeExternals = require('webpack-node-externals');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;


class CompilerPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {

    compiler.plugin("after-emit", (compilation, cb) => {
      //console.log(compilation.assets['merge.js']);
      console.log("Generating schema...")

      const child = spawn('node', ['./dist/index.js', 4005, "schema"]);

      child.stdout.on('data', (data) => {

        const ds = data.toString();
        console.log(`child stdout:\n${ds}`);

        if (ds.includes("Running at")) {
          console.log("Extract");
          exec('node ./generateSchema.js', (err, stdout) => {
            console.log("Types generated");
            console.log(stdout);
            child.kill();
          });
        }

      });

      child.stderr.on('data', (data) => {
        const ds = data.toString();
        console.log(`child stderr:\n${ds}`);
      });


      child.on('exit', function(code, signal) {
        console.log('child process exited with ' + `code ${code} and signal ${signal}`);
        cb();
      });
    });
  }
};


module.exports = (env = {}) => {

  const _TARGET = "node";
  const __ANALYZE__ = env.analyze;
  const __DEV__ = env.development;
  const __PROD__ = env.production || __ANALYZE__;

  if (__PROD__ === __DEV__) {
    throw new Error("Production or development configuration must be selected");
  }

  let _ENV = null;
  if (__PROD__) {
    _ENV = 'production';
  }

  if (__DEV__) {
    _ENV = 'development';
  }

  /****************************************************************************/
  let entry = {};
  entry['index'] = __dirname + '/src/index.jsx';
  entry = {
    ...entry
  };


  /****************************************************************************/
  let plugins = [new CompilerPlugin()];

  if (__PROD__) {
    plugins.push(new UglifyJSPlugin());
  }

  if (__DEV__) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
    /*plugins.push(new webpack.DefinePlugin({
      "process.env": {
        ..._.mapValues(process.env, v => JSON.stringify(v)),
        "NODE_ENV": JSON.stringify(_ENV),
        "BUILD_TARGET": JSON.stringify(_TARGET)
      }
    }));*/
  }

  if (__ANALYZE__) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  /***************************************************************************/
  const rules = [{
    test: /\.jsx$/,
    loader: 'babel-loader',
    include: [path.resolve(__dirname, 'src')]
  }];

  /***************************************************************************/
  const node = {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: "mock",
    __dirname: "mock",
    setImmediate: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  };

  /***************************************************************************/
  const externals = [NodeExternals()];

  return {
    target: _TARGET,
    entry,
    output: {
      path: __dirname + '/dist',
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    module: {
      rules
    },
    plugins,
    resolve: {
      alias: {
        Api: path.resolve(__dirname, 'src/api/'),
        Model: path.resolve(__dirname, 'src/model/'),
        Schema: path.resolve(__dirname, 'src/schema/'),
        Utils: path.resolve(__dirname, 'src/utils/')
      },
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.json']
    },
    devtool: (__DEV__) ? 'cheap-module-source-map' : false,
    externals,
    node
  };
}
/*
,
watchOptions: {
  poll: true
}
*/
