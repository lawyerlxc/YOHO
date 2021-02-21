// 加载gulp，并结构需要的方法
let {task,src,dest,watch,series,parallel} = require('gulp')
let load = require('gulp-load-plugins')()
let del = require('del')//删除文件

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist')
})

// 处理html
task('html',async ()=>{
  src('./views/*.html')
  .pipe(dest('./dist'))
  .pipe(load.connect.reload())
})

// 处理css
task('style',async ()=>{
  src('./style/*.css')
  .pipe(dest('./dist/css'))
  .pipe(load.connect.reload())
})

// 编译sass
task('sass',async ()=>{
  src('./sass/*.scss')
  .pipe(load.sass().on('error', load.sass.logError))//编译sass
  .pipe(dest('./dist/sass'))
  .pipe(load.connect.reload())
})

// 处理js
task('script',async ()=>{
  src('./script/*.js')
  .pipe(dest('./dist/js'))
  .pipe(load.connect.reload())
})
task('script2',async ()=>{
  src('./script/app/*.js')
  .pipe(dest('./dist/js/app'))
  .pipe(load.connect.reload())
})
task('script3',async ()=>{
  src('./script/lib/*.js')
  .pipe(dest('./dist/js/lib'))
  .pipe(load.connect.reload())
})

// 处理img
task('image',async ()=>{
  src('./images/*.*')
  .pipe(dest('./dist/img'))
  .pipe(load.connect.reload())
})
task('image2',async ()=>{
  src('./images/index_carousel/*.*')
  .pipe(dest('./dist/img/index_carousel'))
  .pipe(load.connect.reload())
})
task('image3',async ()=>{
  src('./images/index_goods_carousel/*.*')
  .pipe(dest('./dist/img/index_goods_carousel'))
  .pipe(load.connect.reload())
})
task('image4',async ()=>{
  src('./images/Logintoregister/*.*')
  .pipe(dest('./dist/img/Logintoregister'))
  .pipe(load.connect.reload())
})
task('image41',async ()=>{
  src('./images/Logintoregister/V_code/*.*')
  .pipe(dest('./dist/img/Logintoregister/V_code'))
  .pipe(load.connect.reload())
})
task('image5',async ()=>{
  src('./images/magnify/*.*')
  .pipe(dest('./dist/img/magnify'))
  .pipe(load.connect.reload())
})
task('image6',async ()=>{
  src('./images/other-infos/*.*')
  .pipe(dest('./dist/img/other-infos'))
  .pipe(load.connect.reload())
})
task('image7',async ()=>{
  src('./images/public_paging_header/*.*')
  .pipe(dest('./dist/img/public_paging_header'))
  .pipe(load.connect.reload())
})
task('image8',async ()=>{
  src('./images/share/*.*')
  .pipe(dest('./dist/img/share'))
  .pipe(load.connect.reload())
})
//处理 json
task('json',async ()=>{
  src('./json/*.*')
  .pipe(dest('./dist/json'))
  .pipe(load.connect.reload())
})
task('json2',async ()=>{
  src('./json/other/*.*')
  .pipe(dest('./dist/json/other'))
  .pipe(load.connect.reload())
})
task('json3',async ()=>{
  src('./json/product list/*.*')
  .pipe(dest('./dist/json/product list'))
  .pipe(load.connect.reload())
})

task('config',async ()=>{
  src('./config.js')
  .pipe(dest('./dist'))
  .pipe(load.connect.reload())
})


// 启动一个服务，实现自动刷新
task('reload',async ()=>{
  load.connect.server({
    root: './dist',//设置根目录
    livereload: true//开启自动刷新
  })
})

// 监听文件变化
task('watch',async ()=>{
  watch('./views/*.html',series('html'))
  watch('./style/*',series('sass'))
  watch('./script/*',series('script'))
  watch('./images/*',series('image'))
  // watch('./json/*',series('json'))
})

// 打包（开发环境）
task('dev',series('delDist','html','sass','style','script','script2','script3','image','image2','image3','image4','image5','image6','image7','image8','image41','json','json2','json3','config'))

// 启动项目
task('start',series('dev','reload','watch'))

