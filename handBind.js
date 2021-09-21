Function.prototype.bind2 = function (context) {
    //对context进行深拷贝，防止bind执行后返回函数未执行期间，context被修改
    const ctx = JSON.parse(JSON.stringify(context)) || window
    ctx.func = this
    const args = Array.from(arguments).slice(1)
    return function () {
        //注意bind方法需要合并两次函数执行的参数
        const Allargs = args.concat(Array.from(arguments))
        return Allargs.length > 0 ? ctx.func(...Allargs) : ctx.func()
    }
}

obj = { c: 2 }
function a(x, y, z) { console.log(this, x, y, z) }
a.bind(obj,1,2)(3)//{c:2} 1 2 3
a.bind2(obj, 1, 2)(3)//{c:2,func:[function a]} 1 2
