var src = './src';  //带操作
var dest = './dist'; // 操作完成
module.exports = {
    html: {
        src: src + "/*.html",
        dest: dest + "/",
        settings: {
            collapseWhitespace: true,
            removeComments: true
        }
    },
    css: {
        all: src + "/**/*.cssPractice",
        src: src + "./cssPractice/*.cssPractice",
        dest: dest + "/cssPractice",
        settings: {}
    }
}
