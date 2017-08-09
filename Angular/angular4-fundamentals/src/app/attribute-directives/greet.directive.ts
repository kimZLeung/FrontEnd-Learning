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