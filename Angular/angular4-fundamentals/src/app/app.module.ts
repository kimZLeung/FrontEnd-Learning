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
import { ReactiveFormComponent } from './reactive-form/reactive-form.component'

/* directive */
import { GreetDirective } from './attribute-directives/greet.directive';

const ROUTES: Routes = [
  { path: 'form/:haha', component: SimpleFormComponent  },
  { path: 'reactive', component: ReactiveFormComponent }
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
