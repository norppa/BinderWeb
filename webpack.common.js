const HtmlWebpackPlugin =  require('html-webpack-plugin')

module.exports = {
    entry : './app/index.js',
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {test : /\.png$/, use: 'file-loader' }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ]

}