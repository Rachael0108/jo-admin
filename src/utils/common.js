import Cookies from 'js-cookie';

const TokenKey = "authorized-token";

//获取token
export function getToken() {
    return Cookies.get(TokenKey)
}

//移除token
export function removeToken() {
    Cookies.remove(TokenKey)
}

//获取当前返回URL中的账号和来源
export function getAccount() {
    let index = window.location.href.lastIndexOf("?");
    let datalist = window.location.href.substring(index + 1, window.location.href.length);
    let data = datalist.split('&')
    let obj = {};
    data.map((e) => {
        obj[e.split("=")[0]] = e.split("=")[1];
    })
    return obj
}

export function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function myTypeof(val) {
    var type = typeof val;
    var resObj = {
        "[object Array]": "array",
        "[object Map]": "map",
        "[object Set]": "set",
        "[object Object]": "object",
        "[object Number]": "object number",
        "[object String]": "object string",
        "[object Boolean]": "object boolean",
    };
    if (val === null) {
        return "null";
    } else if (type === "object") {
        var typeStr = Object.prototype.toString.call(val);
        return resObj[typeStr];
    } else {
        return type;
    }
}

//节流，连续触发只会在每time时间段内执行回调
//例如滚动屏幕scroll，不停的滚动只会在[0,time]，[time+1,time*2]，...每个time时间段内分别执行一次回调
export function throttle(func, wait, mustRun){
    let timeout,
        startTime = new Date();
    return function() {
        let context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        //用户滚动的时间大于必须执行的之间了，就强制执行一次
        if(curTime - startTime >= mustRun) {
            func.apply(context, args)
            startTime = curTime
        }else {
            timeout = setTimeout(func, wait)
        }
    }
}

//节流2
export function throttleSim(fn, delay) {
    let last = 0 // 上次触发时间
    return function (...args) {
        const now = Date.now()
        if (now - last > delay) {
            last = now
            fn.apply(this, args)
        }
    }
}

//防抖，连续触发只会在最后一次触发事件延迟time内不再触发事件后执行回调一次
//例如滚动屏幕scroll，不停的滚动只会在（1,需要停止滚动 2,且停止滚动后等待time内不再滚动）后执行一次回调
export function debounce(cb, time = 3000, isImmediately = false) {
    //isImmediately是否立即执行
    let t = null;
    let exec = true;
    return function () {
        const args = arguments;
        t && clearTimeout(t); //清除上次触发事件的定时器
        if (isImmediately && exec) {
            cb.apply(this, args); //首次需立即执行
            exec = false;
        } else {
            t = setTimeout(() => {
                //重新设定最新一次触发事件的定时器
                //debounce调用时的函数的上下文存在 this = undefined 情况，需要更改this指向
                cb.apply(this, args);
                //time内不再触发,即t不被clear，那么time后执行一次回调cb
            }, time);
        }
    };
}

//深度拷贝后，修改拷贝对象，被拷贝的对象不熟影响
export function deepClone(origin, target) {
    var tar = target || {},
        toStr = Object.prototype.toString, arrType = "[object Array]";
    for (var key in origin) {
        console.log(key)
        if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] === "object" && origin[key] !== null) {
                toStr.call(origin[key]) === arrType ? (tar[key] = []) : (tar[key] = {});
                deepClone(origin[key], tar[key]);
            } else {
                tar[key] = origin[key];
            }
        }
    }
    return tar;
}

// 是否为空对象
export function isEmpty(origin) {
    return Reflect.ownKeys(origin).length === 0 && origin.constructor === Object
}

//  数组去重
export function unique(arr) {
    return [...new Set(arr)]
    // 或者
    // return Array.from(new Set(arr))
}

// 扁平化数组: 将深层嵌套展开
// 1. ES6 自带API
export function flatten(params) {
    return params.flat(Infinity)
}

//2. 递归实现
export function flattenBy(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) result = result.concat(flattenBy(arr[i]))
        else result.push(arr[i])
    }
    return result
}

//设置过期时间
//超时则返回true
export function setPass(deadline) {
    // deadline: '2022-8-5'
    let passTime = new Date(deadline)
    let date = new Date()
    return passTime.getTime() <= date.getTime()
}

//给树节点父子节点 disabled 属性
export function reConstructorTree(data) {
    return data.map((item) => {
        if (item.children) {
            return {
                ...item,
                children: reConstructorTree(item.children),
                disabled: false
            }
        } else {
            return {
                ...item,
                disabled: false
            }
        }
    })
}

//通过hasOwnProperty数组去重
export function uniqueOfHasOwnProperty(arr) {
    let obj = {};
    return arr.filter((item) => {
        console.log(typeof item + item)  // number1, stringtrue,booleantrue......
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)  //  hasOwnProperty(number1)
    })
}

//前端处理关键字搜索，仅适用于少量数据
//query: 查询内容  key：查询属性， array：查询原数组
export function keyWord(query, key, array) {
    let newArr = []
    newArr = array.filter(item => {
        return item.key.indexOf(query) >= 0 ? item : ''
    })
    return newArr;
}

/**
 * @instance--可以判断对象是否是实例--可以判断所有基本类型
 * @Object.prototype.toString.call--可以被重写--无法判断自定义的实例对象
 * */

//封装localStorage
//存取
export function localSet(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function localGet(key) {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
        return value
    }
}

//删除
export function localRemove(key) {
    window.localStorage.removeItem(key)
}

// 获取路由中的参数
export function getParams() {
    // 创建一个URLSearchParams实例
    const urlSearchParams = new URLSearchParams(window.location.search);
// 把键值对列表转换为一个对象
    const params = Object.fromEntries(urlSearchParams.entries());
}

