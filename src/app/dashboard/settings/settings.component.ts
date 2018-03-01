import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { SettingsModel } from '../../models/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  options = {
    show: false
  }

  settings: SettingsModel = new SettingsModel();
  settingsObj = {}
  settingsForm: FormGroup;

  constructor(private db: DbService) { }

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

    this.db.getSettings().subscribe( result => {
      this.settingsForm.setValue(result);
      this.options.show = true;
    })
    console.log(this.settingsForm.value);
    /* this.db.getObject('settings/settings')
    .snapshotChanges()
    .map( result => {
    
      if( result.length ){
        result.forEach( item => {
          this.settingsObj[item.key] = item.payload.val()
        })
        Object.assign(this.settings, this.settingsObj)

      }      

      this.settingsForm.setValue(this.settings)
      this.options.show = true;
      return result
    })
    .subscribe() */

    
  }

  onSubmit(){
    this.db.updateSettings(this.settingsForm.value);    
  }

}
