import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  settingsForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.settingsForm = new FormGroup({
      generalSettings: new FormGroup({
        blogName: new FormControl('', Validators.required ),
        blogTitle: new FormControl(),
        blogLogo: new FormControl()
      }),
      showBlogName: new FormControl(),
      useSidebar: new FormControl()      
    })
    this.settingsForm.setValue({
      generalSettings: {
        blogName: 'My Blog',
        blogTitle: 'Angular Blog',
        blogLogo: 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png'
      },
      showBlogName: false,
      useSidebar: true
    })
    this.settingsForm.patchValue({
      generalSettings: {
        blogTitle: 'My Angular Blogs' 
      }
    })
  }
  onSubmit(){
    this.settingsForm.value.generalSettings.blogName
    this.settingsForm.value.generalSettings.blogTitle
    this.settingsForm.value.generalSettings.blogLogo
    this.settingsForm.value.useSidebar
  }

}
