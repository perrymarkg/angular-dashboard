import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NoticeService {

  noticeEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }

  setNotice(message: string, type: string = 'success'){
    this.noticeEmitter.emit({msg: message, type: type})
  }

}
