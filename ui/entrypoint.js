var shell = require('shelljs');

var APIHost = process.env.API_HOST;

shell.sed('-i', '<API_HOST>', 'http://' + APIHost, 'config/prod.env.js');
shell.exec('npm run build');
shell.cd('dist/');
shell.cp('-R', 'index.html', '/usr/local/apache2/htdocs/');
shell.cp('-R', 'static', '/usr/local/apache2/htdocs/');