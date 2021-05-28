// 1、两个数组交集
function makeMapCount(nums) {
  // map，key值是原数组里值，value该值出现的次数
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let key = nums[i]
    let count = map.get(key)
    if (count) {
      map.set(key, count + 1)
    } else {
      map.set(key, 1)
    }
  }
  // return map.values()
  // console.log(map)
  console.log(map.keys())
  for (let val of map.keys()) {
    let count = map.get(val)
    console.log(count)
  }
}
var arr = [1, 2, 3, 3, 3, 3, 5]
makeMapCount(arr)
// function interSet()
