import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from '../../models/page.model';
import { Title } from '@angular/platform-browser';
import { SettingsModel } from '../../models/settings.model';
import { Observable } from 'rxjs/Observable';
import { fadeInOut, fadeInOutCustom, flyInFromRight } from '../../animations/animations';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [fadeInOut, fadeInOutCustom('500ms', '0s'), flyInFromRight]
})
export class BlogComponent implements OnInit {

  blog;
  blogList;
  settings;
  colClass = 'col-md-12';
  slug;
  pager;
  selectedPage = 1;

  constructor(
    private db: DbService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private pagination: PaginationService
  ) {}

  ngOnInit() {

    if ( Object.keys(this.db.data.settings).length ) {
      this.settings = this.db.data.settings;
    }

    if ( Object.keys(this.db.data.activeBlogs).length ) {
      this.setPagination(this.db.data.activeBlogs, this.selectedPage);
    }

    Observable.merge(this.route.params, this.db.dataEmitter).subscribe( result => {

      if ( result['slug'] ) {
        this.slug = result['slug'];
      }

      if ( result['activeBlogs'] && Object.keys(result['activeBlogs']).length && !this.blogList) {
        this.setPagination(result['activeBlogs'], this.selectedPage);
      }

      if (result['settings'] ) {
        this.settings = result['settings'];
      }

      if ( this.slug && this.blogList ) {

        this.blog = false;
        this.blog = this.findBlogItem(this.slug);

        if (this.blog) {
          this.title.setTitle(this.blog.title);
        }

        if ( !this.blog ) {
          this.router.navigate(['../../'], {relativeTo: this.route});
        }

      }

    });

    this.db.dataEmitter.subscribe( result => {

      if ( Object.keys(result.settings).length ) {
        this.settings = result.settings;
      }

      if ( Object.keys(result.activeBlogs).length ) {
        this.setPagination(result.activeBlogs, this.selectedPage);
      }

    });

  }

  findBlogItem(itemSlug: string) {
    return this.db.data.activeBlogs.find( item => {
      return item.url_slug === itemSlug && item.active;
    });
  }

  setPagination(items, selectedPage) {
    this.pager = this.pagination.paginate(items, selectedPage);
    this.blogList = items.slice(this.pager.rangeStart, this.pager.rangeEnd + 1);
  }

  paginate(index) {
    this.selectedPage = index;
    this.setPagination(this.db.data.activeBlogs, index);
  }

}
