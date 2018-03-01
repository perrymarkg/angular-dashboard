import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service'
import { PageModel } from '../../models/page.model'
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs;

  constructor(
    private db: DbService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.db.initBlogs();
    this.db.blogsEmitter.subscribe( blogs => {
      this.blogs = blogs;
      this.loading.toggleBlocker(false);
    })
    
  }

  callTest(){

  }

}
