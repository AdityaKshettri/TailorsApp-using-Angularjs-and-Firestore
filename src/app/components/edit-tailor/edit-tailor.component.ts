import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Tailor } from '../../models/Tailor';
import { TailorService } from '../../services/tailor.service';

@Component({
  selector: 'app-edit-tailor',
  templateUrl: './edit-tailor.component.html',
  styleUrls: ['./edit-tailor.component.css']
})
export class EditTailorComponent implements OnInit {

  id: string;
  tailor: Tailor;

  constructor(
    private tailorService: TailorService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tailorService.getTailor(this.id)
      .subscribe(tailor => {
        if(tailor!=null) {
          this.tailor = tailor;
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
      value.id = this.id;
      this.tailorService.updateTailor(value);
      this.flashMessage.show('Tailor Updated Successfully!', {
        cssClass: 'alert-success', timeout: 5000
      });
      this.router.navigate(['/']);
    }
  }
}
