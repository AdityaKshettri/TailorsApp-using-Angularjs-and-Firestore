import { Component, OnInit } from '@angular/core';

import { Tailor } from '../../models/Tailor';
import { TailorService } from '../../services/tailor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tailor-detail',
  templateUrl: './tailor-detail.component.html',
  styleUrls: ['./tailor-detail.component.css']
})
export class TailorDetailComponent implements OnInit {

  tailors: Tailor[];
  email: string;

  constructor(
    private tailorService: TailorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.tailorService.getTailors()
      .subscribe(tailors => {
        if(tailors) {
          console.log(tailors);
          this.authService.getAuth()
            .subscribe(auth => {
              if(auth) {
                this.email = auth.email;
                this.tailors = tailors.filter(tailor => tailor.email === auth.email);
                console.log(this.tailors);
              }
            });
        }
      });
  }

}
