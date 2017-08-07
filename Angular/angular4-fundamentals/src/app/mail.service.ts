import { Injectable } from '@angular/core';
import { list } from './list'

@Injectable()
export class MailService {
	
	getMess () {
		return '来消息了~'
	}

	getArr () {
		const arr: list[] = [{
			value: '1',
			label: '开始'
		}, {
			value: '2',
			label: '中间'
		}, {
			value: '3',
			label: '结束'
		}]
		return arr
	}

  constructor() { }

}
