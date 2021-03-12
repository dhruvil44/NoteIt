import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NotebookListComponent } from './components/notebook-list/notebook-list.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { Router } from '@angular/router';
import myAppConfig from './config/my-app-config';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';


const oktaConfig = Object.assign({
  onAuthRequired: (injector)=>{
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

 
@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NotebookListComponent,
    SearchComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [{provide: OKTA_CONFIG, useValue:oktaConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
