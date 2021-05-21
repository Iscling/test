function debounce(fn, delay = 200) { // 防抖
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}

function myDebounce(fn, delay = 50) {
  let timer = 0
  if (timer) setTimeout(timer)
  return (...args) => {
    timer = setTimeout(() => {
      fn.apply(this, ...args)
    }, delay)
  }
}

function throttle(fn, delay) { // 节流
  let flag = true;
  return function(...args) {
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true
    }, delay)
  }
}

function myThrottle(fn, delay = 50) {
  let lastTime = 0
  return (...args) => {
    let now = new Date()
    lastTime = now
    if (now - lastTime > delay) {
      fn.apply(this, ...args)
    }
  }
}
function dealYestday(time) { // 处理昨天
  const td = new Date()
  const td1 = new Date(td.getFullYear(), td.getMonth(), td.getDate()).getTime()
  time = time.replace(new RegExp(/-/gm), '/')
  const od = new Date(time)
  const od1 = new Date(od.getFullYear(), od.getMonth(), od.getDate()).getTime()
  const days = (od1 - td1) / 1000 / 60 / 60 / 24
  const colon = ':'
  const zero = '0'
  const yestday = '昨天'
  const slash = '-'
  const hour = new Date(time).getHours()
  const minute = new Date(time).getMinutes()
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const day = new Date(time).getDate()
  const dealMinute = minute > 9 ? minute : zero + minute
  const dealHour = hour > 9 ? hour : (zero + hour)
  const dealDay = day > 9 ? day : (zero + day)
  const dealMonth = month > 9 ? month : (zero + month)
  const time1 = dealHour + colon + dealMinute
  const time2 = year + slash + dealMonth + slash + dealDay
  if (days < -1) return time2
  if (days < 0) return yestday + time1
  if (days === 0) return time1
}

// bubbleSort
function bubbleSort(arr) {
  if (arr.length <= 1) return
  for (let i; i <= arr.length; i++) {
    let lock = true
    for (let j; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        let tmp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = tmp
        lock = false
      }
    }
    if (lock) return
  }
  return arr
}

// insertionSort

function insertionSort(arr) {
  let len = arr.length
  let preIndex, currentVal
  for (let i; i < len; i++) {
    preIndex = i - 1
    currentVal = arr[i]
    while (preIndex >= 0 && currentVal < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex --
    }
    arr[preIndex + 1] = currentVal
  }
}

function selectionSort(arr) {
  let len = arr.length
  let minIndex, temp
  for (let i; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}


// 组合继承
function Parent(value) {
  this.val = value
}

Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}

Child.prototype = new Parent()


//数据响应
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}


// 手写call
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}

// 手写apply
Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
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

// 手写bind
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new _this(..args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
