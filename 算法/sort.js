var _kimzSort = {
  // 快排
  quickSort: function (a) {
    if (a.length <= 1) {
      return a
    }
    var midLength = Math.floor(a.length / 2)
    var midValue = a.splice(midLength, 1)
    var left = []
    var right = []
    for (var i = 0; i < a.length; i++) {
      if (a[i] < midValue) {
        left.push(a[i])
      } else {
        right.push(a[i])
      }
    }
    return quickSort(left).concat(midValue, quickSort(right))
  },
  // 冒泡
  bubbleSort: function (a) {
    var length = a.length
    var sortArray
    for (var i = 0; i < length-1; i++) {
      for (var j = 0; j < length-i-1 ; j++) {
        if (a[j] > a[j+1]) {
          sortArray = a[j]
          a[j] = a[j+1]
          a[j+1] = sortArray
        }
      }
    }
    return a
  },
  // 插入排序
  insertSort: function (a) {
    // var length = a.length
    // var sortArray
    // for (var i = 1; i < length; i++) {
    //   for (var j = 0; j < i ; j++) {
    //     if (a[i] < a[j]) {
    //       sortArray = a[i]
    //       a[i] = a[j]
    //       a[j] = sortArray
    //     }
    //   }
    // }
    // return a
    var len = a.length
    for (var i = 1; i < len; i++) {
      var key = a[i]
      var j = i - 1
      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j]
        j--
      }
      a[j + 1] = key
    }
    return a
  },
  // 选择排序
  selectSort: function (a) {
    for (var i = 0; i < a.length; i++) {
      var min = a[i]
      var k = i
      for (var j = i + 1; j < a.length; j++) {
        if (min > a[j]) {
          min = a[j]
          k = j
        }
      }
      a[k] = a[i]
      a[i] = min
    }
    return a
  },
  // 希尔排序
  shellSort: function (a) {
    var increment = a.length
    var i
    var temp //暂存
    var count = 0
    do {
      //设置增量
      increment = Math.floor(increment / 3) + 1
      for (i = increment ; i < a.length; i++) {
        console.log('本趟比较的增量设置为：', increment)
        if (a[i] < a[i - increment]) {
          temp = a[i]
          // 这里相当于插入排序，以increment为增量分出的一组的插入排序，前面的已经是有序序列
          // 这里的循环条件为大于0，也就是前一项必须存在，而且前一项也大于新插入的这一项
          for (var j = i - increment; j >= 0 && temp < a[j]; j -= increment) {
            a[j + increment] = a[j]
          }
          a[j + increment] = temp
        }
      }
    } while (increment > 1)
    return a
  }
}