const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    target: 'node',   //  web
    externals: [nodeExternals()],
    entry: {
        'index': './src/index.js',        
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',   //  index.bundle.js 로 위의 entry 명을 기준으로 생성
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'    //   .babelrc 파일을 바탕으로 실행
            }
        ]
    }
}