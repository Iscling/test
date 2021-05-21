1、JS实现二分法查找
2、深拷贝
3、作用域、词法环境
4、flex各属性
5、事件代理
var a = {}
var b = Symbol('123')
var c = Symbol('456')
a[b]='b'
a[c]='c'
a[b]

var a = 100
function invoke(fn) {
  var a = 200
  fn()
}
function fn() {
  alert(a)
}
invoke(fn)


const arr2 = [1, 5, 9, 15, 28, 33, 55, 78, 99];

/**
 * 返回最接近输入值的数字，如果有多个，返回最大的那个
 * @param {number} n
 * @return {number}
 */
function findNext(n, arr) {
  // your code here...
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        let tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
      }
    }
  }
  let newArr = arr
  let result = []
  for (let k = 0; k < newArr.length; k++) {
    let lock = false
    if (newArr[i] > n) {
      result.push(newArr[i])
    }
  }
  if (result.length === 1) return result[0]
  if (result.length > 1) return result[-1]
}

console.log(findNext(1, arr2)); // should print 1
console.log(findNext(44, arr2)); // should print 55
console.log(findNext(6, arr2)); // should print 5
console.log(findNext(7, arr2)); // should print 9
console.log(findNext(8, arr2)); // should print 9



function interFun(arr1, arr2) {
  arr1.forEach((item, index) => {
    let result = []
    if (arr2.indexOf(item) > -1) {
      result.push(item)
    }
  })
  return result
}


// 每隔1秒发送一次接口请求，次数达到6次或者后端返回res.complete == true停止；前端接收后端数据取最新的，例如第一次请求的返回数据res1比第二次请求的res2晚，只使用res2；数据接口可以用 fetch('/getData’）模拟



let oMap = new Map()

// 求数组中出现次数大于数组长度一半的数
// 一个整数数组，假设肯定有一个数出现的次数大于一半，编写函数 `getNumber` 找出这个数。
//  例如：getNumber([1, 2, 3, 2, 2]) 返回结果 2。
function findMost (arr) {
  if (!arr.length) return;
  if (arr.length === 1) return 1;
  let res = {};
  let maxNum, maxTimes = 0
  // 遍历数组
  arr.forEach((item) => {
    res[item] ? res[item] += 1 : res[item] = 1
    if (res[item] > maxTimes) {
      maxNum = item
      maxTimes = res[item]
    }
  })
  if (maxTimes > Math.floor(arr.length) / 2) return maxNum
  return false
}
