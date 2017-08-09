import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/map'

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
export class SimpleFormComponent implements AfterViewInit, OnInit {

  @Input() message: string
  @Input() name: string
  @Output() update = new EventEmitter()
  @ViewChild('tpl') tplRef: TemplateRef<any>
  inputValue: string = '哈哈'
  radioList = ['1', '2', '3']
  username: string


  ngAfterViewInit() {
    this.vcRef.createEmbeddedView(this.tplRef);
  }

  onSubmit (val) {
    console.log(val)
  }

  constructor(private vcRef: ViewContainerRef, private route: ActivatedRoute) { 
    // route.params.subscribe((params) => this.username = params.haha)
  }

  ngOnInit() {
    this.route.params
      .map((res) => {
        console.log(res)
        return res
      })
      .subscribe((params) => this.username = params.haha)
    // console.log(this.route.params)
  }

}
