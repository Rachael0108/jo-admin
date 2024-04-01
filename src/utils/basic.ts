import {CSSProperties} from 'vue'

export function noop() {}

// let new = extend({}, source);
// 如果source对象里的属性都是基本数据类型，那就是执行深拷贝了, 互相独立
export const extend = Object.assign;

export const inBrowser = typeof window !== 'undefined';

export type Numeric = number | string;

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export const isDate = (val: unknown): val is Date =>
  Object.prototype.toString.call(val) === '[Object Date]' &&
  !Number.isNaN((val as Date).getTime());

export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '')
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
}

export const isIOS = (): boolean =>
  inBrowser
    ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toUpperCase())
    : false;

export const ToArray = <T>(item: T | T[]): T[] =>
  Array.isArray(item) ? item : [item];

export const isDef = <T>(val: T): val is NonNullable<T> =>
  val !== undefined && val !== null;

export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch)

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const isSameValue = (newValue: unknown, oldValue: unknown) =>
  JSON.stringify(newValue) === JSON.stringify(oldValue);

// isArray([1,2,3]) => true
export const isType = (type: string) => {
  return (obj: any) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}

import fs from 'fs';
const readFileThunk = (filename: string) => {
  return (callback) => {
    fs.readFile(filename, callback)
  }
}
const gen = function* () {
  const data1 = yield readFileThunk('a.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('b.txt')
  console.log(data2.toString())
}
//获取readFileThunk('')的结果: g.next().value()
let g = gen();
// co函数: 自动执行Generator函数
const co = require('co');
let g = gen();
co(g).then(res =>{
  console.log(res);
})
