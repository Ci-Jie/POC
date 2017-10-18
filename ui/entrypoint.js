var shell = require('shelljs');

var APIHost = process.env.API_HOST;

shell.sed('-i', '<API_HOST>', APIHost, 'config/dev.env.js');
shell.exec('npm run dev');