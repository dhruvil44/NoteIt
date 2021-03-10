import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';

import myAppConfig from './config/my-app-config';



import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';


const oktaConfig = Object.assign({
  onAuthRequired: (injector)=>{
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);



const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  { path: 'notebook/:id' , component: NoteListComponent, canActivate:[OktaAuthGuard]},
  { path: 'note/:searchKeyword', component: NoteListComponent, canActivate: [OktaAuthGuard]},
  { path: 'all', component:NoteListComponent, canActivate:[OktaAuthGuard]},
  { path: '', component: NoteListComponent, canActivate:[OktaAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
