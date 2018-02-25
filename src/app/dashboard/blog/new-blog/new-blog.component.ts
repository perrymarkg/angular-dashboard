import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageModel } from '../../../models/page.model'
import { DbService } from '../../../services/db.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  title: string;
  content: string;
  page: PageModel;
  allowSubmit: boolean = false;

  constructor(private db: DbService) { }

  ngOnInit() {

  }

  onSubmit( form: NgForm ){
    if( form.valid ){
      this.page = {
        parent:'',
        title: form.controls['title'].value,
        content: form.controls['content'].value,
        created: new Date().getTime(),
        updated: new Date().getTime(),
        active: true,
        type: 'blog',
        categories: []
      }
      this.db.addPages(this.page).then( r => {
        if( r ){
          form.reset()
        }
      })
    }
    else {
      // do something
    }
  }

}
