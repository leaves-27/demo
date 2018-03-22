var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");
// if(process.env.NODE_ENV=="production"){
//   publicPath = "http://gaea.tongbanjie.com/";
// }else{
//   publicPath = "http://gaea.tongbanjie.com:8080/";
// }

var fileContent = fs.readFileSync('./package.json');
var packageJSON = JSON.parse(fileContent);
var dirPath = 'build/'+packageJSON.name;
var NODE_ENV = process.env.NODE_ENV;

var getHtmlWebpackPlugins = function(path,templates){
  var arr = [];
  for(var i=0;i < templates.length;i++){
    arr.push(new HtmlWebpackPlugin({
      filename : templates[i], //生成的html文件名
      template : path+templates[i], //生成html依赖的模板
      inject : false, //自动注入资源
      minify : { 
        removeComments : true,    //移除HTML中的注释
        collapseWhitespace : true,    //删除空白符与换行符
        removeAttributeQuotes: true 
      }
    }))
  }
  return arr;
}

var htmls = [
  'index.html'
]
var rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]?[hash]'
    }
  },{ 
    test: /\.css$/, 
    use: [{
      loader:'style-loader'
    },{
      loader:'css-loader'
    },{
      loader: "postcss-loader",
      options: {
        plugins: function() {
          return [
            require('autoprefixer')
          ];
        }
      }
    }]
  },{ 
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
    loader: "file-loader" 
  },{ 
    test: /\.(woff|woff2)$/, 
    loader:"url-loader?prefix=font/&limit=5000" 
  },{ 
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
    loader: "url-loader?limit=10000&mimetype=application/octet-stream" 
  },{ 
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
    loader: "url-loader?limit=10000&mimetype=image/svg+xml" 
  },{
    test: require.resolve('jquery'),
    use:[{
      loader: 'expose-loader',
      options: 'jQuery'
    },{
      loader: 'expose-loader',
      options: '$'
    }]
  }
]

module.exports = {
  entry : {
    "home" : "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, dirPath),
    publicPath: "/",
    filename: 'static/[name].js',
    chunkFilename:'static/[name].[chunkhash:8].js'
  },
  module: {
    rules: rules
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    contentBase :  path.resolve(__dirname, dirPath),
    hot : true,
    inline :true,
    port : 8081
  },
  performance: {
    hints : false
  },
  devtool: '#eval-source-map',
  plugins: getHtmlWebpackPlugins("./src/page/",htmls).concat([
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new CopyWebpackPlugin([{ 
      from: './src/common/*.json', 
      flatten : true, 
      to: path.resolve(__dirname, dirPath + "/common/")
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"'+NODE_ENV+'"'
      }
    })
  ])
}

if(NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ])
}else{
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
  ])
}