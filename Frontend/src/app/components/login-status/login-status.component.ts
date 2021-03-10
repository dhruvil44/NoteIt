import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;
  email: string;

  userName: string;
  tempEmail: string;

  constructor(private oktaAuthService: OktaAuthService) { }

   ngOnInit() {

    this.oktaAuthService.$authenticationState.subscribe(
      (result)=>{
        this.isAuthenticated=result;
        this.getUserDetails();
      }
    )

  }

  getUserDetails(){
    if(this.isAuthenticated){
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name;
          this.email = res.email;
        }
      )
    }
  }



  logout(){
    this.oktaAuthService.signOut();
  }

}
