import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Tailor } from '../../models/Tailor';
import { TailorService } from '../../services/tailor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tailor-details',
  templateUrl: './tailor-details.component.html',
  styleUrls: ['./tailor-details.component.css']
})
export class TailorDetailsComponent implements OnInit {

  id: string;
  tailor: Tailor;
  isLoggedIn: boolean;

  constructor(
    private tailorService: TailorService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tailorService.getTailor(this.id)
      .subscribe(tailor => {
        if(tailor) {
          this.authService.getAuth()
            .subscribe(auth => {
              if(auth && auth.email === tailor.email) {
                this.isLoggedIn = true;
              }
              else {
                this.isLoggedIn = false;
              }
            });
          this.tailor = tailor;
        }
      });

  }

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this.tailorService.deleteTailer(this.tailor);
      this.flashMessage.show('Tailor Removed!', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/tailors']);
    }
  }
}
