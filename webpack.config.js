const webpackConfig = {
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module:{
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.ya?ml$/, loader: 'yaml-loader' },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};
module.exports = webpackConfig;
