// n个数组求交集
function nInter(...rest) {
  let arr = [].concat(...rest)
  let newArr = []
  for (let i = 0; i < arr.length - 1; i++) {
    let count = 0
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) count++
      if (count === [...rest].length && newArr.indexOf(arr[i]) < 0) {
        newArr.push(arr[i])
        break
      }
    }
  }
  return newArr
}

// 是不是回文字符串
function isPlalindrome(input) {
  if (typeof input !== 'string') return false
  return input.split('').reverse().join('') === input
}

function isPlalindrome(input) {
  if (typeof input !== 'string') return false
  let i = 0, j = input.length - 1
  while (i < j) {
    if (input.charAt(i) !==input.charAt(j)) return
    i++
    j--
  }
  return true
}

// 计算重复字符串里唯一的字符串
function calStr(str) {
  let strArr = str.split('')
  let newArr = []
  for (let i = 0; i < strArr.length; i++) {
    if (newArr.indexOf(arr[i]) < 0) {
      newArr.push(arr[i])
    }
  }
  return newArr.join('')
}

// 匹配字符串
// 输入: "()[]{}"
// 输出: true

function symValid(s) {
  let map = {
    '(': ')',
    '{': '}',
    '[': ']'
  }
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i])
    } else if (s[i] !== map[stack.pop()]) {
      return false
    }
  }
  return stack.length === 0
}

// 删除字符串中的所有相邻重复项
// 输入："abbaca"
// 输出："ca"
function removeDuplicates(s) {
  let stack = []
  for (const c of s) {
    let prev = stack.pop()
    if (prev !== c) {
      stack.push(prev)
      stack.push(c)
    }
  }
  return stack.join('')
}

// 防抖
function myDebounce(fn, delay = 50) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

//节流
function myThrottle(fn, delay = 50) {
  let now = new Date().getTime()
  let lastTime = 0
  return (...args) => {
    if (now - lastTime > delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

//deepClone
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return
  let newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
}

//实现event
class EventEmitter {
  constructor() {
    this.handlers = {}
  }
  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = []
      this.handlers[eventName].push(cb)
    }
  }
  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach(callback => {
        callback(...args)
      })
    }
  }
  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (index !== -1) callbacks.splice(index, 1)
  }
  once(eventName, cb) {
    const wrapper = ...args => {
      cb.apply(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}

// instanceof
function myInstance(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}

// myNew
function myNew() {
  let obj = {}
  let con = [].shift.call(arguments)
  obj.__proto__ = con.prototype
  let result = con.apply(obj, arguments)
  result = result instanceof Object ? result : obj
  return result
}

// myCall
function myCall(context) {
  context = context || window
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(args)
  delete context.fn
  return result
}

// myApply
function myApply(context) {
  context = context || window
  context.fn = this
  if (arguments[1]) {
    context.fn(...arguments[1])
  } else {
    context.fn()
  }
  return result
}

//myBind
function myBind(context) {
  context = context || window
  let _this = this
  let args = [...arguments].slice(1)
  let result
  return function F() {
    if (this instanceof F) {
      result = new _this(...arguments, ...args)
    } else {
      result = _this.apply(context, args.concat(...arguments))
    }
  }
}

// Promise
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function newPromise(fn) {
  let _this = this
  _this.value = null
  _this.state = PENDING
  _this.resolvedCallBacks = []
  _this.rejectCallBacks = []
  function resolve(value) {
    if (value instanceof Promise) return value.then(_this.resolve, _this.reject)
    setTimeout(() => {
      if (_this.state === PENDING) {
        _this.value = value
        this.state = RESOLVED
        _this.resolvedCallBacks.map(cb => cb())
      }
    });
  }
  function reject(reason) {
    setTimeout(() => {
      if (_this.state === PENDING) {
        _this.value = reason
        _this.state = REJECTED
        _this.rejectCallBacks.map(cb => cb())
      }
    });
  }
  try {
    fn(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

newPromise.prototype.then = function (onResolved, onRejected) {
  let self = this
  onResolved = typeof onResolved === 'function' ? onResolved : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : r => throw r
  if (self.state === PENDING) {
    self.resolvedCallBacks.push(onResolved)
    self.rejectCallBacks.push(onRejected)
  }
  if (self.state === RESOLVED) {
    self.onResolved(self.value)
  }
  if (self.state === REJECTED) {
    self.onRejected(self.value)
  }
}

// Promise.resolve
Promise.resolve = (param) => {
  if (param instanceof Promise) return param
  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then === 'function') {
      param.then(resolve, reject)
    } else {
      resolve(param)
    }
  })
}

//Promise.reject
Promise.reject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// Promise.finally
Promise.prototype.finally = function (callbacks) {
  this.then(value => {
    return Promise.resolve(callbacks()).then(() => {
      return value
    })
  }, error => {
    return Promise.resolve(callbacks()).then(() => {
      throw error
    })
  })
}

// Promise.all
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let index = 0
    let result = []
    let len = promises.length
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        result[i] = data
        index++
        if (index === len) resolve(result)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

// Promise.allSettled
Promise.allSettled = function(iterable) {
  return new Promise((resolve, reject) => {
    function addElementToResult(i, elem) {
      result[i] = elem
      elementCount++
      if (elementCount === result.length) resolve(result)
    }
    let index = 0
    for (const promise of iterable) {
      const currentIndex = index
      promise.then(
        (value) => addElementToResult(
        currentIndex, {
          status: 'fulfilled',
          value
        }),
        (reason) => addElementToResult(
          currentIndex, {
            status: 'rejected',
            reason
          }
        )
      )
      index++
    }
    if (index === 0) {
      resolve([])
      return
    }
    let elementCount = 0
    const result = new Array(index)
  })
}

// Promise.race
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length
    if (!len) return
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        return resolve(data)
      }).catch(err => {
        return reject(err)
      })
    }
  }
}

function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return
  const newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[k] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
}

let obj = {
  a: 1,
  b: [1, 2, 3],
  c: {}
};
let emptyObj = Object.create(null);
deepClone(emptyObj, obj);
console.log(emptyObj.a == obj.a);
console.log(emptyObj.b == obj.b);


function longCommonStr(strs) {
  if (strs === null || strs.length === 0) return ''
  let prevs = strs[0]
  for (let i = 1; i < strs.length; i++) {
    let j = 0
    for (; j < prevs.length && j < strs[i].length; j++) {
      if (prevs.charAt(j) !== strs[i].charAt(j)) break
    }
    prevs = substr(0, j)
    if (prevs === '') return ''
    return prevs
  }
}


function limitFn(count, array, iterateFn) {
  const tasks = []
  const doingTasks = []
  let i = 0
  const enqueue = () => {
    if (i === array.length) return Promise.resolve()
    const task = Promise.resolve().then(() => iterateFn(array[i++]))
    tasks.push(task)
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
    doingTasks.push(doing)
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()
    return res.then(enqueue)
  }
  return enqueue().then(() => Promise.all(tasks))
}

function transCam(str) {
  let strArr = str.split('-')
  strArr.forEach((item, index) => {
  })
}
