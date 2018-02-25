import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  title: string;
  content: string;
  allowSubmit: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  onSubmit( form: NgForm ){
    console.log(form);
    if( form.valid ){
      // submit the form

      // Override values on the form
      form.setValue({
        title: 'New Title',
        content: 'new content'
      })
      form.controls['content'].setValue('testing')
      // Override
      
      // reset values sample
      //form.reset();
    }
    else {
      // do something
    }
  }

}
