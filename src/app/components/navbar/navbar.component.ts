import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else {
        this.isLoggedIn = false;
        this.loggedInUser = null;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = null;
    this.flashMessage.show('You are now logged out!', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/']);
  }

}
