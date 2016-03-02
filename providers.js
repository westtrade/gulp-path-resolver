'use strict';

module.exports = {
	
	npm : function (path) {
		//var [moduleName] = path.split('/');
		return require.resolve(path)
	},

	bower : function (path) {
		let splt = path.split('/');
		let moduleName = splt.unshift();

		try {
			let bowerPath = bowerResolve(moduleName);
		} catch (Exception) {
			console.error(Exception);
			return path;
		}

		return bowerPath ? bowerPath . splt.join('/') : path;
	}
};