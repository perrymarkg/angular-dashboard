import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service'
import { PageModel } from '../../models/page.model'
import { AngularFireList } from 'angularfire2/database';
import { LoadingService } from '../../services/loading.service';
import { fadeInOutCustom } from '../../animations/animations';
import { PaginationService } from '../../services/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NoticeService } from '../../services/notice.service';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Improve... Too many nested calls
    if( Object.keys(this.db.data.blogs).length ){
      this.setPagination(this.db.data.blogs, this.route.snapshot.queryParams['page'])    
      this.route.queryParams.subscribe( param => {
        if(param['page'])
        this.selectedPage = param['page'];
        this.setPagination(this.db.data.blogs, this.selectedPage)
      })
    }
     
    this.db.dataEmitter.map( result => {
      this.route.queryParams.subscribe( param => {
        if(param['page'])
        this.selectedPage = param['page'];
        this.setPagination(result.blogs, this.selectedPage)
      })
      return result
    }).subscribe( results => {
      this.setPagination(this.db.data.blogs, this.selectedPage)
      this.loading.toggleBlocker(false);
    })
  }

  setPagination(items, selectedPage){
    this.pager = this.pagination.paginate(items, selectedPage);
    if( selectedPage > this.pager.totalPages.length ){
      this.selectedPage = 1;
      this.pager = this.pagination.paginate(items, 1);
    }
      
    this.blogs = items.slice(this.pager.rangeStart, this.pager.rangeEnd + 1)
  }

}
