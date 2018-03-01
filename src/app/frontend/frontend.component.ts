import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SettingsModel } from '../models/settings.model';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  
  settings: SettingsModel;
  constructor(private db: DbService) { }

  ngOnInit() {
    this.db.settingsEmitter.subscribe( result => {
      this.settings = result;
    });
    /* this.db.settingsEmitter.subscribe( result => {
      console.log(result);
    }) */
    /* this.db.getSettings().subscribe( result => {
      this.settings = result;
    }) */
  }

}
