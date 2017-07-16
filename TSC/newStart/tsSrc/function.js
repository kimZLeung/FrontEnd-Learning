/**
 * [toMyString 简单来说就是输出输入的类型限制]
 * @param  {[type]} num: number        [description]
 * @return {[type]}      [description]
 */
function toMyString(num) {
    return num + '';
}
/**
 * [string 上面的函数还可以这样进行声明]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
var toMyString2 = function (num) {
    return num + '';
};
// 可以利用推断类型这样写
var toMyString3 = function (num) {
    return num + '';
};
toMyString(1);
toMyString2(2);
/**
 * [suits 重载可以这样写参数验证]
 * @type {Array}
 */
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
//test this, 参数里面可以指定this的类型喔
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.onClickBad = function (e) {
        this.info = e;
    };
    return Handler;
}());
var h = new Handler();
var firstSearch = function (source, data) {
    return source + data;
};
firstSearch('123', 123);
