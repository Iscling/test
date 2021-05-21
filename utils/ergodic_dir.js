export function ergodic_sync(dir, callback) { // 同步遍历文件夹
  fs.readdirSync(dir).forEach((file) => {
    var path_name = path.join(dir, file)
    if (fs.statSync(path_name).isDirectory()) {
      ergodic_sync(path_name, callback)
    } else {
      callback(path_name)
    }
  })
}
export function ergodic_async(dir, callback, finish) { // 异步遍历文件夹
  fs.readdir(dir, (err, files) => {
    (function next(i) {
      if (i < files.length) {
        var path_name = path.join(dir, files[i])
        fs.stat(path_name, function (err, stats) {
          if (stats.isDirectory()) {
            ergodic_async(path_name, callback, function () {
              next(i + 1)
            })
          } else {
            callback(path_name, function () {
              next(i + 1)
            })
          }
        })
      } else {
        finish && finish()
      }
    }(0))
  })
}
