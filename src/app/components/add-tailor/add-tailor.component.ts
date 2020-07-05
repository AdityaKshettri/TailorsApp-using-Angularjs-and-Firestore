import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Tailor } from '../../models/Tailor';
import { TailorService } from '../../services/tailor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-tailor',
  templateUrl: './add-tailor.component.html',
  styleUrls: ['./add-tailor.component.css']
})
export class AddTailorComponent implements OnInit {

  tailor: Tailor = {
    tailorName: '',
    shopName: '',
    shopNumber: '',
    description: '',
    dateOfRegistration: null,
    street: '',
    area: '',
    city: '',
    state: '',
    country: '',
    mobile: '',
    email: '',
    maleDress: '',
    femaleDress: '',
    tags: '',
    imageUrl: ''
  }

  constructor(
    private flashMessage: FlashMessagesService,
    private tailorService: TailorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getAuth()
    .subscribe(auth => {
      if(auth) {
        this.tailor.email = auth.email;
      }
    });
  }

  onSubmit({value, valid}: {value: Tailor, valid: boolean}) {
    if(!valid) {
      this.flashMessage.show('Fill out the tailor form properly!', {
        cssClass: 'alert-danger', timeout: 5000
      });
    }
    else {
      value.dateOfRegistration = new Date();
      value.email = this.tailor.email;
      this.tailorService.newTailor(value);
      this.flashMessage.show('Tailor Added Successfully!', {
        cssClass: 'alert-success', timeout: 5000
      });
      this.router.navigate(['/']);
    }
  }

}
