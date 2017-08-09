import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styles: []
})
export class ReactiveFormComponent implements OnInit {

  signupForm: FormGroup; 

  constructor(private fb: FormBuilder) {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
    // this.signupForm = fb.group({
    //   userName: {value: 'semlinker', disabled: false}
    // })
  }

  save () {
    console.log(this.signupForm.controls)
  }

  ngOnInit() {
  }

}
