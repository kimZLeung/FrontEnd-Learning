interface LabelledValue {
  label: string;
  count?: number;
}

interface flexValue {
  readonly label: string;
  count?: number;
  [propName: string]: any;
}

let a: LabelledValue = {
  label: '123'
}

let b: LabelledValue = {
  label: '312',
  count: 2
}

let c: flexValue = {
  label: '123',
  ff: '123',
  count: 1
}


// 函数接口测试
interface seaFunc {
  (from: string): string
}

let search: seaFunc = function(from) {
  return '123'
}

search('123')