import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'noteit';

  isAuthenticated: boolean = false;

  constructor(private oktaAuthService: OktaAuthService){

  }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (result)=>{
        this.isAuthenticated=result;
      }
    )
  }

}
