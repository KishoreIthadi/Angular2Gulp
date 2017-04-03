# Angular2 Gulp Production Build

This application demonstrates how to give production build using gulp in multiple ways.

## Download/Clone the project from the GitHub

```bash
npm install
```

## Install gulp globally

```bash
npm install gulp -g
```
## Description

This application demonstrates two kinds of builds

### 1.	build-prod

```bash
npm run build-prod
```

After running the above command, the production build will be placed in dist folder.

In this build, all the HTML files included using templateUrl and CSS files included using styleUrls will be copied into production build folder. The final build file structure is shown below. Here we have to maintain the same folder structure as in development mode.

![Alt text](https://github.com/KishoreIthadi/Angular2Gulp/blob/master/readmefiles/Gulp-Prod.png?raw=true "Gulp-Build")

You can also combine all the component CSS files into a single bundle as specified in below gulp task.

```js
gulp.task('bundle-component-css', () => {
    return gulp.src('src/app/**/*.css')
        .pipe(concat('bundlecss.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/src/css/'))
});
```


### 2.	build-prod-inline

```bash
npm run build-prod-inline
```

After running the above command, the production build will be placed in dist folder.

In this build, all the HTML pages included using templateUrl and CSS files included using styleUrls will be loaded into the JS file as templates. This way the application will load the HTML, CSS much faster and the total number of request made will be less. The final build file structure is shown below.

![Alt text](https://github.com/KishoreIthadi/Angular2Gulp/blob/master/readmefiles/Gulp-Prod-Inline.png?raw=true "Gulp-Build-Inline")


## Conclusion

It really depends on the developer to choose the appropriate build based on their requirement. In the first scenario, replacing the CSS and HTML in production server would be much easier. In the second scenario, you have to run the gulp task and then replace appropriate files.
