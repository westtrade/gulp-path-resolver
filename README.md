# gulp-path-resolver

Gulp plugin for path resolving from differnet package managers like npm, bower, component.js


> Resolve path to import files from less, sass or javascript browserify files



## Installation

Install `gulp-path-resolver` as a development dependency:

```shell
npm i --save-dev gulp-path-resolver
```


## Usage

### In your `gulpfile.js`:


```less

@import "npm://bootstrap/less/bootstrap.less";
@import "bower://bootstrap/less/bootstrap.less";
@import "your_private_repo://bootstrap/less/bootstrap.less";

```

```javascript
var pathResolver = require('gulp-path-resolver');

gulp.task('less', function() {   

	return gulp.src("assets/less/**/*.less")
		.pipe(pathResolver({
			'your_private_repo' : {
				'type' : 'git',
				'credentials' : {
					'user' : '1234',
					'password' : 'testtest'
				},
				'uri' : 'http://github.com'
			}
		}))
		.pipe(less())
		.pipe(concat('style.css'))
		.pipe(gulp.dest("assets/css"))
	;
});




```


## License


The MIT License (MIT)

Copyright (c) 2016 Popov Gena

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[npm-url]: https://npmjs.org/package/gulp-path-resolver
[npm-image]: https://badge.fury.io/js/gulp-path-resolver.png

[travis-url]: http://travis-ci.org/westtrade/gulp-path-resolver
[travis-image]: https://secure.travis-ci.org/westtrade/gulp-path-resolver.png?branch=master

[depstat-url]: https://david-dm.org/westtrade/gulp-path-resolver
[depstat-image]: https://david-dm.org/westtrade/gulp-path-resolver.png