import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
/* my service */
import { MailService } from './mail.service'

/* components */
import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';

/* directive */
import { GreetDirective } from './attribute-directives/greet.directive';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component'

const ROUTES: Routes = [
  { path: 'form', component: SimpleFormComponent  }
]

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent,
    GreetDirective,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [MailService, {provide:'api', useValue:'label：'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
