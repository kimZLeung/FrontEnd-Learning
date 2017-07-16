/**
 * [toMyString 简单来说就是输出输入的类型限制]
 * @param  {[type]} num: number        [description]
 * @return {[type]}      [description]
 */
function toMyString (num: number): string {
	return num + '';
}
/**
 * [string 上面的函数还可以这样进行声明]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
let toMyString2: (num: number) => string = function(num: number):string {
	return num + ''
}

// 可以利用推断类型这样写
let toMyString3: (num: number) => string = function(num) {
	return num + ''
}


toMyString(1)
toMyString2(2)


/**
 * [suits 重载可以这样写参数验证]
 * @type {Array}
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

//test this, 参数里面可以指定this的类型喔
class Handler {
    info: any;
    onClickBad(this: Handler, e: Event) {
        this.info = e;
    }
}
let h = new Handler();

// 据说这样会报错，因为class里面声明了this的类型是Handler的，但是事件触发之后的this并不是指向Handler类的实例的
// Element.addClickListener(h.onClickBad);


/**
 * 使用接口表示函数类型
 */
interface searchFunc {
  (source: string, data: number): any
}

let firstSearch: searchFunc = function(source: string, data: number) {
  return source + data
}

firstSearch('123', 123)