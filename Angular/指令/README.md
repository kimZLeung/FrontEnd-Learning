# Angularָ��

---

## Angular��ָ���Ϊ��������

- ���������ӵ��`template`��ָ�һ�����ʹ��`@Component`װ��������
- �ṹ��ָ�ͨ����Ӻ��Ƴ�DOMԪ�ظı�DOM���ֵ�ָ���`ngIf`��`ngFor`��һ�����ʹ��`@Directive`װ��������
- ������ָ��ı�Ԫ�ء����������ָ�����ۺ���Ϊ��ָ���`ngStyle`��`ngClass`��һ�����ʹ��`@Directive`װ��������

������ָ�����ǿ����ߴ����ģ�������Ҫд�ڶ�Ӧ��NgModule����`declarations`

---

## �Զ���ָ��

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

ʹ��`@HostBinding`�������Զ���ָ��ʱ��`@HostBinding`���԰�һЩDOM�ڵ�����ԣ�����`innerText`��`innerHTML`

ʹ��`@HostListener`����ʵ���¼��ļ�����`@HostListener`��һ���������¼�����string�����ڶ��������Ǻ���������array[]��