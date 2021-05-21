function maxRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + 1 + min)
}
maxRandom(1, 100)

function fillNum(min, max, len) {
  let randomNum
  let i = 0
  let arr = []
  // randomNum = Math.floor(Math.random() * (max - min) + 1 + min)
  arr[0] = min
  while (i < len) {
    randomNum = Math.floor(Math.random() * (max - min) + 1 + min)
    if (arr.indexOf(arr[i]) < 0) {
      arr.push(randomNum)
      i++
    }
  }
  return arr
}
fillNum(2, 8, 3)

const list = [{
  id: 1,
  name: '1',
}, {
  id: 2,
  name: '2',
}, {
  id: 3,
  parentId: 1,
  name: '1.3',
}, {
  id: 4,
  parentId: 1,
  name: '1.4',
}, {
  id: 5,
  parentId: 3,
  name: '1.3.5',
}];

const tree = [{
  id: 1,
  name: '1',
  children: [{
    id: 3,
    parentId: 1,
    name: '1.3',
    children: [{
      id: 5,
      parentId: 3,
      name: '1.3.5',
    }]
  }, {
    id: 4,
    parentId: 1,
    name: '1.4',
  }]
}, {
  id: 2,
  name: '2',
  children: null,
}];


// deepTraversal --是指从某一顶点出发，首先访问这个顶点，然后找出刚访问这个的第一个未被访问过的邻接点，然后再以此邻接点为顶点，继续找他的下一个顶点进行访问。重复此步骤，直至所有的节点都被访问完为止
function deepTraversal(node) {
  let nodes = []
  if (node !== null) {
    nodes.push(node)
    let childrens = node.children
    for (let i=0; i < childrens.length; i++) {
      deepTraversal(childrens[i])
    }
  }
  return nodes
}

// wideTraversal --是从某个顶点出发，首先访问这个顶点，然后找出刚访问这个节点所有未被访问过的邻接点，访问完后再访问这些邻接点中第一个邻接点的所有节点，重复此方法，直到所有节点都被访问完为止
function wideTraversal(node) {
  let nodes = [],
  i = 0
  if (node !== null) {
    nodes.push(node)
    wideTraversal(node.nextElementSibling)
    node = nodes[i++]
    wideTraversal(node.firstElementChild)
  }
  return nodes
}

function myFlat(arr) {
  Array.from(new Set(arr.flat(Infinity))).sort(a, b) => {
    return a - b
  }
}

function myUnique(arr) {
  return arr.filter(function(item, index, arr)) {
    return arr.indexOf(item, 0) === index
  }
}


function myNew() {
  let obj = {}
  let con = [].shift().call(arguments)
  obj.__proto__ = con.prototype
  let result = con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}

function myInstance(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left !== null || left !== undefined) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}

function myCall(context) {
  if (this !== 'function') throw new TypeError('error')
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  let result = context.fn(args)
  delete context.fn()
  return result
}

function myApply(context) {
  if (this !== 'function') throw new TypeError('error')
  context = context || window
  context.fn = this
  if (...arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn()
  return result
}

function myBind(context) {
  if (typeof this !== 'function') throw new TypeError('error')
  context = context || window
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) return new _this(...args, ...arguments)
    return _this.apply(context, args.concat(...arguments))
  }
}

function oWarp() {
  let ret = []
  return function flat(a) {
    for (let item of a) {
      if (item.constructor === Array) {
        ret.concat(flat(item))
      } else {
        ret.push(item)
      }
    }
    return ret
  }
}

function myInter(arr1, arr2) {
  let arr = []
  arr1.filter(item => {
    // if (arr2.indexOf(item) > -1) arr.push(item)
    return arr2.includes(item)
  })
}

function mySleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
mySleep(1000).then(() => {
  //
})

function optimizeBubble(arr) {
  let array = [...arr]
  let isOk = true
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        isOk = false
      }
      if (isOk) break
    }
  }
  return arr
}


function formArr(arr) {
  const sortArr = Array.from(new Set(arr)).sort((a, b) => a - b)
  const map = new Map()
  sortArr.forEach((item) => {
    const lev = Math.floor(item / 10)
    const group = map.get(lev) || []
    group.push(item)
    map.set(lev, group)
  })
  return [...map.values()]
}
const arr2 = [2, 10, 3, 4, 5, 11, 10, 11, 20]
console.log(formArr(arr2));

function transStr(str) {
  let arr = str.split('')
  arr.map((item) => {
    return item = item.toUpperCase() ? item.toLowerCae() : item.toUpperCase()
  })
  arr.join()
}


function findStr(S, T) {
  if (S.length < T.length) return -1
  for (let i = 0; i < S.length; i++) {
    if (S.slice(i, i + T.length) === T) return i
    return -1
  }
}

function myDebounce(fn, delay = 50) {
  let timer = null
  return args => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(args)
    }, delay)
  }
}

function moveZero(arr) {
  let len = arr.length
  let j = 0
  for (let i = 0; i < len - j; i++) {
    if (arr[i] === 0) {
      arr.push(i)
      arr.splice(i, 1)
      i--
      j++
    }
  }
  return arr
}

function convert(list) {
  let res = []
  let map = list.reduce((res, v) => (res[v.id] = v, res), {})
  for (let item of list) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return res
}

Promise._race = promises => new Promise((resolve, reject) => {
  promises.forEach(promise => {
    promise.then(resolve, reject)
  })
})

function myFind(value) {
  let result = []
  let findArr = data
  let skey = ''
  for (let i = 0; i < array.length; i++) {
    skey += value[i]
    let res = findArr.find(item => {
      return item.id == skey
    })
    if (!res) return []
    result.push(item.id)
    if (item.children) {
      findArr = item.children
    } else {
      if (i < array.length - 1) return []
      return result
    }
  }
}

function pivotFind(target, array) {
  let i = 0
  let j = array[i].length - 1
  while (i < array.length && j >= 0) {
    if (array[i][j] < target) {
      i++
    } else if (array[i][j] > target) {
      i--
    } else {
      return true
    }
  }
  return false
}

function pivotFind(arr, key) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (key === mid) return mid
  } else if (key > arr[mid]) {
    low = mid + 1
  } else {
    high = mid - 1
  }
  return -1
}

function deepClone(obj) {
  if (typeof obj !== 'object') return
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}
