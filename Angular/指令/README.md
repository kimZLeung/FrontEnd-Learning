# Angular指令

---

## Angular的指令分为三种类型

- 组件：就是拥有`template`的指令，一般可以使用`@Component`装饰器创建
- 结构型指令：通过添加和移除DOM元素改变DOM布局的指令，如`ngIf`和`ngFor`，一般可以使用`@Directive`装饰器创建
- 属性型指令：改变元素、组件或其它指令的外观和行为的指令，如`ngStyle`和`ngClass`，一般可以使用`@Directive`装饰器创建

这三种指令，如果是开发者创建的，都是需要写在对应的NgModule里面`declarations`

---

## 自定义指令

``` JavaScript
import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[greet]'
})
export class GreetDirective {
    @HostBinding() get innerHTML () {
	    return '<h3>' + this.greet + '</h3>'
	  }

	  @HostListener('click',['$event']) 
	    onClick(event) {
	      this.greet = 'Clicked!';
	    }

	  @HostListener('mouseover',['$event']) 
	    haha(event) {
	      this.greet = 'mouseover!';
	    }

	  @Input() greet: string
}
```

使用`@HostBinding`来构建自定义指令时，`@HostBinding`可以绑定一些DOM节点的属性，比如`innerText`、`innerHTML`

使用`@HostListener`可以实现事件的监听，`@HostListener`第一个参数是事件名（string），第二个参数是函数参数（array[]）