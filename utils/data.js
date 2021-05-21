function checkArray(array) {
  if (!array) return
}

function swap(array, left, right) {
  let rightValue = array[right]
  let array[left] = array[right]
  array[left] = rightValue
}

function bubbleSort(array) {
  checkArray(array)
  for (let i; i < array.length; i ++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j - 1]; j--) {
      swap(array, j, j + 1)
    }
  }
  return array
}

function selectionSort(array) {
  checkArray(array)
  for (let i; i < array.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex
    }
    swap(array, i, minIndex)
  }
  return array
}

function quickSort(arr) {
  if (arr.length <= 1) return arr
  let left = []
  let right = []
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(pivot, quickSort(right))
}

// requestAnimationFrame
function halfSearch(arr, target) {
  if (!arr.length) return
  let low = 0
  let high = arr.length - 1
  let mid = Math.floor((high + low) / 2)
  while (low <= high) {
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] > target) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return -1
}

const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
}
// 先序遍历
function preOrder(root) {
  if (!root) return
  console.log('当前遍历的结点值是：', root.val)
  preOrder(root.left)
  preOrder(root.right)
}
// 中序遍历
function inOrder(root) {
  if (!root) return
  inOrder(root.left)
  console.log('当前遍历的结点值是：', root.val)
  inOrder(root.right)
}
// 后序遍历
function posOrder(root) {
  if (!root) return
  posOrder(root.left)
  posOrder(root.right)
  console.log('当前遍历的结点值是：', root.val)
}


// 两数求和问题
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

function twoSum(nums, target) {
  const diffs = {}
  const len = nums.length
  for (let i = 0; i < len; i++) {
    // diffs[9 - nums[0] <===> 2] ====> diffs[7]
    // diffs[9 - 7] = diffs[2]
    if (diffs[target - nums[i]] !== undefined) return [diffs[target - nums[i]], i]
    // diffs[2] = 0, diffs[7] = 1, diffs[11] = 2, diffs[15] = 3
    diffs[nums[i]] = i
  }
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j]
      }
    }
  }
}

// 合并两数组 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6], n = 3
// 输出: [1,2,2,3,5,6]
function merge(arr1, m, arr2, n) {
  let i = m - 1,
      j = n - 1,
      k = m + n - 1
  while (i >= 0 && j >= 0) {
    if (arr1[i] > arr2[j])
    arr1[k] = arr1[i]
    i--
    k--
  } else {
    arr1[k] = arr2[j]
    j--
    k--
  }
  while (j >= 0) {
    arr1[k] = arr2[j]
    k--
    j--
  }
}

// 三数求和问题，给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ] ？？？wtf

// 折半查找
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

// 链表的合并
// 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
function listMerge(l1, l2) {
  let head = new ListNode()
  let cur = head
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1
      l1.next = l1
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 !== null ? l1 : l2
  return head.next
}

// 链表结点的删除
// 输入: 1->1->2
// 输出: 1->2
function delHead(head) {
  let cur = head
  while (cur != null && cur.next != null) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

// 广度优先遍历
function BFS(root) {
  const queue = []
  queue.push(root)
  while (queue.length) {
    const top = queue[0]
    console.log(top.val)
    if (top.left) queue.push(top.left)
    if (top.right) queue.push(top.right)
    queue.shift()
  }
}

// 全排列问题
// 输入: [1,2,3]
// 输出: [
// [1,2,3],
// [1,3,2],
// [2,1,3],
// [2,3,1],
// [3,1,2],
// [3,2,1]
// ]
function permute(nums) {
  const len = nums.length
  // curArr 变量用来记录当前的排列内容
  const curArr = []
    // res 用来记录所有的排列顺序
  const res = []
  // visited 用来避免重复使用同一个数字
  const visited = {}
  function dfs(nth) {
    if (nth === len) {
      res.push(curArr.slice())
      return
    }
    for (let i = 0; i < len; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1
        curArr.push(nums[i])
        dfs(nth + 1)
        curArr.pop()
        visited[nums[i]] = 0
      }
    }
  }
  dfs(0)
  return res
}

// 遍历序列
function preTraversal(root) {
  const res = []
  if (!root) return res
  const stack = []
  stack.push(root)
  // 先序遍历序列
  // while (stack.length) {
  //   const cur = stack.pop()
  //   res.push(cur.val)
  //   if (cur.right) stack.push(cur.right)
  //   if (cur.left) stack.push(cur.left)
  // }
  // 后序遍历序列
    while (stack.length) {
      const cur = stack.pop()
      res.unshift(cur.val)
      if (cur.right) stack.push(cur.right)
      if (cur.left) stack.push(cur.left)
    }
  return res
}

// 二叉搜索树
function search(root, n) {
  if (!root) return
  if (root.val === n) {
    console.log('目标节点是：', root)
  } else if (root.val > n) {
    search(root.left, n)
  } else {
    search(root.right, n)
  }
}

// 二叉搜索树插入节点
function insertBST(root, n) {
  if (!root) {
    root = new TreeNode()
    return root
  }
  if (root.val > n) {
    root.left = insertBST(root.left, n)
  } else {
    root.right = insertBST(root.right, n)
  }
  return root
}

// 215,543,21
// 12345512 => 12,345,512
function splitNum(num) {
  let arr = []
  let numArr = num.split('').reverse()
  numArr.forEach((item, index) => {
    arr.push(item)
    if ((index + 1) % 3 === 0) arr.push(',')
  })
  return arr.reverse().join('')
}

//
var family = {
  val: 89,
  father: {
    val: 50,
    father: {
      val: 70
    },
    mother: {
      val: 80,
      father: {
        val: 90,
      }
    }
  },
  mother: {
    val: 99,
    mother: {
      val: 120
    }
  }
}
function findMaxVal(obj) {
  // for (let key in obj) {
  //   if (obj[key] instanceof Object) {}
  // }
  // if (obj.father)
}

//给定一个数组，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
var arr = [0, 0, 0, 12, 2, 1, 0, 0, 0, 123, 12, 0, 14, 0, 14, 0, 0]
// [12, 2, 1, 123, 12, 0....]
function moveZero(arr) {
  arr.filter(item => item > 0)
  let arr1 = []
  let arr2 = []
  arr.forEach((item, index) => {
    if (item === 0) {
      arr1.push(item)
    } else {
      arr2.push(item)
    }
  })
  return arr2.concat(arr1)
}
moveZero(arr)

var arr = [1,3,3,3,1,5,6,7,8,1]
function dumpArray(arr) {
  let arr1 = []
  for (let item of arr) {
    if (!arr1.includes(item)) {
      arr1.push(item)
    }
  }
  return arr1
}


function makeMapCount(nums) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i]
    let count = map.get(num)
    if (count) {
      map.set(num, count + 1)
    } else {
      map.set(num, 1)
    }
  }
  return map
}
