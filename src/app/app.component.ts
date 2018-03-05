import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { DbService } from './services/db.service';
import { fadeInOut } from './animations/animations';
import { SettingsModel } from './models/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut]
})
export class AppComponent {

  title = 'app';
  showLoading = true;
  settings: SettingsModel = new SettingsModel();

  constructor(
    private loading: LoadingService,
    private db: DbService
  ) {
    this.db.initSettings();

    this.loading.toggleLoadingEmitter.subscribe( val => this.showLoading = val);

  }

  generateSettings() {
    this.db.updateSettings(this.settings);
  }

}
