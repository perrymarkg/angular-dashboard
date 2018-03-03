import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { fadeInOut } from '../../animations/animations';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [fadeInOut]
})
export class IndexComponent implements OnInit {

  blogs;
  loadedBlogs;
  selectedPage = 1;
  perPage = 6;
  pager;

  constructor( 
    private db: DbService, 
    private title: Title,
    private pagination: PaginationService
  ) { }

  ngOnInit() {
    if( Object.keys(this.db.data.activeBlogs).length ){
      this.blogs = this.db.data.activeBlogs
      this.setPagination()
    }
      

    this.db.dataEmitter.subscribe( results => {
      if( Object.keys(results.activeBlogs).length ){
        this.blogs = results.activeBlogs;
        this.setPagination();
      }
    })
    this.title.setTitle('Home');
  }

  setPagination(){
    let blogs = this.blogs;
    this.pager = this.pagination.paginate(this.blogs, this.selectedPage, this.perPage);
    if( !this.loadedBlogs )
      this.loadedBlogs = blogs.slice(this.pager.rangeStart, this.pager.rangeEnd + 1) 
  }

  loadMore(){
    this.selectedPage++;
    let blogs = this.blogs
    this.pager = this.pagination.paginate(this.blogs, this.selectedPage, this.perPage);
    this.loadedBlogs = this.loadedBlogs.concat(
      blogs.slice(this.pager.rangeStart, this.pager.rangeEnd + 1) 
    )
  }

}
