import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service'
import { PageModel } from '../../models/page.model'
import { AngularFireList } from 'angularfire2/database';
import { LoadingService } from '../../services/loading.service';
import { fadeInOutCustom } from '../../animations/animations';
import { PaginationService } from '../../services/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations:[fadeInOutCustom()]
})
export class BlogComponent implements OnInit {

  blogs;
  pager;
  selectedPage = 1;

  constructor(
    private db: DbService,
    private loading: LoadingService,
    private pagination: PaginationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    if( Object.keys(this.db.data.blogs).length ){
      this.setPagination(this.db.data.blogs, this.route.snapshot.queryParams['page'])    
    }

    /* if( this.blogs ){
      this.route.queryParams.subscribe( param => {
        this.selectedPage = param['page'];
        this.setPagination(this.blogs, param['page'])
      })
    } */
       
     
    this.db.dataEmitter.map( result => {
      this.route.queryParams.subscribe( param => {
        this.selectedPage = param['page'];
        this.setPagination(result.blogs, param['page'])
      })
      return result
    }).subscribe( results => {
      this.setPagination(this.db.data.blogs, this.selectedPage)
      this.loading.toggleBlocker(false);      
    })
  }

  setPagination(items, selectedPage){
    //console.log(this.db.data.blogs);
    this.pager = this.pagination.paginate(items, selectedPage);
    this.blogs = items.slice(this.pager.rangeStart, this.pager.rangeEnd + 1)
  }

}
