import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

  data = {
    items: false,
    totalPages:[],
    rangeStart:0,
    rangeEnd:0,
    currentPage:1
  }
  constructor() {}

  paginate(items, currentPage = 1, perPage = 5){
    
    if( items.length ){
      const total = Math.ceil(items.length / perPage)
      this.data.currentPage = currentPage;
      this.data.totalPages = Array(total).fill(0).map((x,i)=>i) ;
      this.data.rangeStart = ( (this.data.currentPage * perPage ) - perPage);
      this.data.rangeEnd = (this.data.currentPage * perPage) - 1
      
      return this.data;
      
    }
    
  }


}
