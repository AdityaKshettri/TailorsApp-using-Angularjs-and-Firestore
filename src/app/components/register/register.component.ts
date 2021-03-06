import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/tailors']);
      }
    });
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
    .then(res => {
      this.flashMessage.show('You are now registered and logged in!', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/tailors']);
    })
    .catch(err => {
      this.flashMessage.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }
}
