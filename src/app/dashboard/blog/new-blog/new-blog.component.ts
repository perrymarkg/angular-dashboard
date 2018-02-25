import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageModel } from '../../../models/page.model'

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

  constructor() { }

  ngOnInit() {

  }

  onSubmit( form: NgForm ){
    if( form.valid ){
      /* const pageItem = {
        title: form.controls['title'].value
      }
      this.page = pageItem */
      /* this.page.title = form.controls['title'].value;
      this.page.content = form.controls['content'].value;
      this.page.created = new Date(); */
      console.log(this.page);
      // reset values sample
      //form.reset();
    }
    else {
      // do something
    }
  }

}
