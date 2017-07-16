var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
// 测试修饰符
/**
 * public: 在实例上也可访问
 * protected: 在类里面可以访问，继承这个类之后也可以访问它(可以通过public的方法读写)
 * private： 只在本个类里面可以访问(可以通过public的方法读写)
 */
var papa = (function () {
    function papa(bane) {
        this.name = bane;
    }
    return papa;
}());
var son = (function (_super) {
    __extends(son, _super);
    function son(name, theSex) {
        var _this = _super.call(this, name) || this;
        _this.sex = theSex;
        return _this;
    }
    son.prototype.getName = function () {
        return this.name;
    };
    return son;
}(papa));
var hehe = new son('das', 'nan');
hehe.getName();
