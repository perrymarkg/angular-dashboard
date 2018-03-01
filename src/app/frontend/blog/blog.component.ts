import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from '../../models/page.model';
import { Title } from '@angular/platform-browser';
import { SettingsModel } from '../../models/settings.model';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog;
  blogList;
  settings;
  colClass = 'col-md-12'

  constructor( 
    private db: DbService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.db.initSettings();
    this.db.initBlogs();
    this.route.params.subscribe( param => {
      this.db.setSelectedBlogFrontend(param['slug'])
    })
    this.db.blogItemFrontendEmitter.subscribe( result => {
      this.blog = result;
    })
    this.db.blogsEmitter.subscribe( result => {
      this.blogList = result;
    })    
    this.db.settingsEmitter.subscribe( result => {
      this.settings = result;
    })
    
  }

}
