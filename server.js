var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.js');

var port = 4000;
var ip = '0.0.0.0';
new WebpackDevServer(webpack(config), {
	stats: { colors: true },
    publicPath: config.output.publicPath,
    historyApiFallback: true
}).listen(port, ip, function (err) {
    if(err) {
        return console.log(err);
    }
	console.log('Proxy started at http://localhost:' + port);
});