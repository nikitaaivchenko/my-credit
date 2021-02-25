var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify');

gulp.task('sass', function () { // Создаем таск Sass
  return gulp.src('scss/**/*.scss') // Берем источник
    .pipe(sass().on('error', notify.onError(
      {
        message: "<%= error.message %>",
        title: "Sass Error!"
      }))
    )
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({
      stream: true
    })) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: './', // Директория для сервера - app
      
    },
    notify: false // Отключаем уведомления
  });
});

gulp.task('prefix', function () { //Создайем таск автопрефиксера 
  gulp.src('css/style.css') //Выбираем файл, которйы будем модифицировать

    .pipe(autoprefixer({
      browsers: ['last 2 versions'], //Поддержка 
      cascade: false // ???
    }))
    .pipe(gulp.dest('dist')) //Куда выгружаем готовый файл
});


gulp.task('watch', ['browser-sync', 'sass'], function () {
  gulp.watch('scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);