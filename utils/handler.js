
function myCall(context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
function call(context) {
  if (this !== 'function') throw new TypeError('error')
  context = context || window
  context.fn = this
  let args = [...arguments].slice(1)
  const result = context.fn(...args)
}

function myApply(context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

function myBind(context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}



function myNew() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}


function myInstance(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while(true) {
    if (left === null || left === undefined) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}

// 解决0.1+0.2 !== 0.3
parseFloat((0.1 + 0.2).toFixed(10))


function myThrottle(fn, delay = 50) {
  let lastTime = 0
  return (...args) => {
    let nowTime = new Date()
    lastTime = nowTime
    if (nowTime - lastTime > delay) {
      fn.apply(this, ...args)
    }
  }
}



function myDebounce(fn, delay = 50) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, ...args)
    }, delay)
  }
}

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

class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {}
  }
  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    // 如果没有，那么首先初始化一个监听函数队列
    if (!this.handlers[eventName]) this.handlers[eventName] = []
    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb)
  }
  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 如果有，则逐个调用队列里的回调函数
      this.handlers[eventName].forEach(callback => {
        callback(...args)
      })
    }
  }
  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (index === -1) callbacks.splice(index, 1)
  }
  // 为事件注册单次监听器
  once(eventName, cb) {
     // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb.apply(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}
