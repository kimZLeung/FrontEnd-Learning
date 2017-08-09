import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styles: []
})
export class ReactiveFormComponent implements OnInit {

  signupForm: FormGroup; 

  constructor() { 
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  save () {
    console.log(this.signupForm.controls)
  }

  ngOnInit() {
  }

}
