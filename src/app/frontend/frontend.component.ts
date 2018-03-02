import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SettingsModel } from '../models/settings.model';
import { Observable } from '@firebase/util';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  
  settings: SettingsModel;
  constructor(
    private db: DbService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.db.initSettings();
    this.db.dataEmitter.subscribe( results => {
      this.settings = results.settings;
      this.loading.toggleLoading(false);
    })
    
  }

}
