'use strict';

const through2 = require('through2');
const bowerResolve = require('bower-path');
const providers = require('./providers');
const _ = require('lodash');

module.exports = function (cfgProviders) {

	cfgProviders = _.extend({}, providers, cfgProviders);
	return through2.obj(function (file, enc, cb) {

		
			// Fail on empty files
			if (file.isNull()) {
				return cb(null, file);
			}

			if (file.isStream()) {
				return cb(new utils.PluginError('gulp-path-resolver', 'Streaming not supported'));
			}



		let fileContent = file.contents.toString();	
		let commentRegexp = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
		let commentLessContent = fileContent.replace(commentRegexp, '');
		
		let allProvideKeys = Object.keys(cfgProviders);
		let searchString = `['"](${allProvideKeys.join('|')})[:][/]{2}([^'"]*)['"]`;
		let searchRegexp = new RegExp(searchString, 'gim');
		let matchResult = commentLessContent.match(searchRegexp);

		let result = matchResult.map(originalPath => {
			let splt = originalPath.replace(/['"]/gim, '').split('://');		
			let repositoryName = splt[0];
			let path = splt[1];
			let resolvedPath = repositoryName in cfgProviders ? cfgProviders[repositoryName](path) : originalPath;
			return resolvedPath;
		});

		Promise
			.all(result)
			.then(function(results) { 			
				matchResult.forEach(function (originalPath, idx) {
					let resolvedPath = results[idx];
					fileContent = fileContent.replace(originalPath, `'${ resolvedPath }'`);
				});
				file.contents = new Buffer(fileContent);
				cb(null, file); 
			});		
	});
}
