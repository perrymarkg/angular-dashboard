import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {

  toggleLoadingEmitter: EventEmitter<boolean> = new EventEmitter();
  toggleBlockerEmitter: EventEmitter<boolean> = new EventEmitter();
  constructor() { 

  }

  toggleLoading(val: boolean){
    this.toggleLoadingEmitter.emit(val);
  }

  toggleBlocker(val: boolean){
    this.toggleBlockerEmitter.emit(val);
  }



}
