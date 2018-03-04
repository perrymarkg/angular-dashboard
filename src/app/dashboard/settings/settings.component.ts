import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { SettingsModel } from '../../models/settings.model';
import { NoticeService } from '../../services/notice.service';
import { fadeInOutCustom } from '../../animations/animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [fadeInOutCustom()]
})
export class SettingsComponent implements OnInit {

  options = {
    show: false
  };

  settings: SettingsModel = new SettingsModel();
  settingsObj = {};
  settingsForm: FormGroup;

  constructor(private db: DbService, private notice: NoticeService) { }

  ngOnInit() {

    this.settingsForm = new FormGroup({
      generalSettings: new FormGroup({
        blogName: new FormControl('', Validators.required ),
        blogTitle: new FormControl(),
        blogLogo: new FormControl()
      }),
      showBlogName: new FormControl(),
      useSidebar: new FormControl()
    });

    if ( Object.keys(this.db.data.settings).length ) {
      this.settingsForm.setValue( this.db.data.settings );
      this.options.show = true;
    }

    this.db.dataEmitter.subscribe( results => {
      if ( Object.keys(this.db.data.settings).length ) {
        this.settingsForm.setValue(this.db.data.settings);
        this.options.show = true;
      }
    });

  }

  onSubmit() {
    this.notice.setNotice('Settings updated successfully!');
    this.db.updateSettings(this.settingsForm.value);
  }

}
