import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
/* my service */
import { MailService } from './mail.service'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [MailService, {provide:'api', useValue:'label：'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
