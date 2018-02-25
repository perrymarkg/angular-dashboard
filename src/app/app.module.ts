import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TitleDirective } from './dashboard/directives/title.directive';

import { LoginService } from './services/login.service'

import { AuthGuard } from './services/authguard.service';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { env } from './env/env';

import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { LoginComponent } from './login/login.component';
import { FrontendComponent} from './frontend/frontend.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { NewBlogComponent } from './dashboard/blog/new-blog/new-blog.component';
import { SettingsComponent } from './dashboard/settings/settings.component';


const appRoutes: Routes = [
  { path: '', component: FrontendComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
    { path: '', component:HomeComponent },
    { path: 'blog', component:BlogComponent },
    { path: 'blog/new', component: NewBlogComponent },
    { path: 'settings', component: SettingsComponent }
  ]},
  { path: 'login', component: LoginComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    LoginComponent,
    DashboardComponent,
    FrontendComponent,
    HomeComponent,
    TitleDirective,
    SidebarComponent,
    BlogComponent,
    NewBlogComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(env.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
