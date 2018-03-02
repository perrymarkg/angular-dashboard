import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service'
import { PageModel } from '../../models/page.model'
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
import { LoadingService } from '../../services/loading.service';
import { fadeInOutCustom } from '../../animations/animations';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations:[fadeInOutCustom()]
})
export class BlogComponent implements OnInit {

  blogs;

  constructor(
    private db: DbService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    if( Object.keys(this.db.data.blogs).length )
      this.blogs = this.db.data.blogs;
     
    this.db.dataEmitter.subscribe( results => {
      this.blogs = results.blogs;
      this.loading.toggleBlocker(false);      
    })
  }

  callTest(){

  }

}
