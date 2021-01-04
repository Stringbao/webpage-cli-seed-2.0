
var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env = {}) =>{
    console.log(`------------------- ${env.Generative?'生产':'开发'}环境 -------------------`);
    var plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin(['dist']),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        //引入jq
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            q: "q"
        })
    ])
    //这里可以控制uat环境和production环境所需要的不同的插件
    if(!env.Generative){
        plugins = [];
    }
    //复制不参与打包的文件
    plugins.push(new CopyWebpackPlugin([
        {
            from : path.join(__dirname,'./src/static'),
            to : 'static'
        },
    ]));
    //html组件，脚本文件会自动载入
    plugins.push(new HtmlWebpackPlugin({
        filename: './index.html',   
        template: './index.html'
    }));
    return {
        entry: {
            "index":'./src/index.js',
        },
        output: {
            path: path.resolve(__dirname, './dist'),//输出结果
            publicPath: env.Generative ? './' : '/', //文件路径
            filename: '[name].js?v='+version,
            chunkFilename: '[id].chunk.js'  //模块异步加载时候的分包文件，和路由有关
        },
        module: {
            rules: [
                //  使用vue-loader 加载 .vue 结尾的文件
                // 使用babel 加载 .js 结尾的文件
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                // 加载图标
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        limit: 8192,
                        outputPath: 'static/images'
                    }
                },
                //加载css
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader",
                },
                {
                    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                    // loader: 'url-loader'
                    loader:'url-loader',options:{name:'fonts/[name].[hash:8].[ext]'}//项目设置打包到dist下的fonts文件夹下

                   },
                // {
                //     test: /\.html$/,
                //     loader: 'html-loader',
                //     options: {
                //         minimize: false
                //     }
                // }
            ]
        },
        resolve: {
            
        },
        externals: {
            "BMap": "BMap"
        },
        devServer: {
            inline: true, //检测文件变化，实时构建并刷新浏览器
            port: "8006",
            proxy: {
                '/api': {
                    // target: 'https://mbuy.lenovouat.com/',
                    // target:'https://mbuy.vip.lenovouat.com/',
                    // target:"http://10.112.74.160:8080",
                    target: 'http://his.local.coolvis.com:21920/api/',
                    pathRewrite: {
                        "^/api": ""
                    },
                    secure: false,
                    changeOrigin: true
                }
            },
            //404 页面返回 index.html
            historyApiFallback: true,
        },
        performance: {
            hints: false
        },
        plugins:plugins,
        devtool: '#eval-source-map'//开发模式下更方便定位错误
        // devtool:env.Generative?false:'#eval-source-map'
    }
}