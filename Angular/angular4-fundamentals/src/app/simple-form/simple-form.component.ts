import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styles: [`
   input.ng-invalid {
       border: 1px solid red;
       outline: none;
    }
   input.ng-valid {
       border: 1px solid green;
       outline: none;
    }
  `]
})
export class SimpleFormComponent implements AfterViewInit {

  @Input() message: string
  @Input() name: string
  @Output() update = new EventEmitter()
  @ViewChild('tpl') tplRef: TemplateRef<any>
  inputValue: string = '哈哈'
  radioList = ['1', '2', '3']


  ngAfterViewInit() {
    this.vcRef.createEmbeddedView(this.tplRef);
  }

  onSubmit (val) {
    console.log(val)
  }

  constructor(private vcRef: ViewContainerRef) { }

  // ngOnInit() {
  // }

}
