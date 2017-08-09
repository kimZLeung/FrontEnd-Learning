import { Component, Inject, Input } from '@angular/core';
import { MailService } from './mail.service'
import { list } from './list'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
	
	@Input() message: string
	title: string
	api_url: string
	list: list[]
	mess

	onclick (e, val) {
		console.log(e, val)
		console.log(this.mess)
	}

	handleUpdate(text) {
		if (text) {
			console.log(text)
		}
	}

  constructor (private mail: MailService, @Inject('api') private apiUrl) {
  	this.title = mail.getMess()
  	this.list = mail.getArr()
  	this.api_url = apiUrl
  }
}
