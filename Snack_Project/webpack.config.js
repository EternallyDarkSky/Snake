const path = require('path') ;
// 引入htmlwebpackplugin 插件
const htmlwebpackplugin = require('html-webpack-plugin')
// 引入clean-webpack=plugin 插件
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
    // 指定入口文件
    entry:"./src/index.ts" ,
    // 指定打包文件所在目录
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:"bundle.js",
        environment:{
            // 解决webpack 打包最外层的箭头函数
            "arrowFunction":false ,
            "const":false,
        }
    },
    // 指定webpack打包时使用的模块
    module:{
        // 指定webpack打包时要加载的规则
        rules:[
            { 
                // test指定规则生效的文件--处理ts的规则
                test: /\.ts$/,
                /* 指定使用的loader
                    babal-loader 
                    ts-loader */
                use:[ // 配置babel
                    {
                        // 指定加载器
                        loader:'babel-loader' ,
                        options:{
                            // 设置预定义的环境，浏览器型号及版本
                            presets:[
                                [
                                    //" 指定环境插件"
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 指定要兼容的浏览去
                                        targets: {
                                            // 浏览器的型号：浏览器版本 【兼容带chrome 的88版本】
                                            "chrome":"80" ,
                                            'ie':"11",
                                        },
                                        // 对老版本提供特殊功能，如Promise
                                        "corejs":"3" ,     // 指定刚才下载的core-js 版本
                                        // 使用corejs 的方式: useage=按需加载 , 
                                        "useBuiltIns": "usage" , 
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'],
                // 指定要排除的文件夹
                exclude: /node-module/ ,
            },
            // 设置针对Less 的规则
            {
                test: /\.less$/,
                // loader执行顺序为从下往上
                use: [{
                  loader: "style-loader" // creates style nodes from JS strings
                }, {
                  loader: "css-loader"   // translates CSS into CommonJS
                }, 
                // 引入postcss
                {
                    loader:"postcss-loader",
                    options:{
                        postcssOptions:{
                            plugins:[
                                [
                                    "postcss-preset-env",
                                    {
                                        browsers:"last 2 versions"  // 兼容当前浏览器的最新的两个版本
                                    }
                                ]
                            ],
                        }
                    }
                },
                
                {
                  loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    // 配置webpack 的插件
    plugins:[
        new htmlwebpackplugin({
            // title:"快乐中国" , // 方式一：比较简单，功能较低
            template :"./src/index.html"  //方式二：使用src下的index 设置head的title
        }), // 该插件将在webpack中生效
        new CleanWebpackPlugin(),
    ],
    // 设置项目内部模块间的引用
    resolve:{
        // 凡是以ts、js 结尾的文件都可以作为模块使用
        extensions:['.ts','.js']
    },
    mode: 'development',
    watch:true
}