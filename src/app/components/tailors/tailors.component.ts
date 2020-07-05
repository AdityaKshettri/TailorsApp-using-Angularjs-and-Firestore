import { Component, OnInit } from '@angular/core';

import { Tailor } from '../../models/Tailor';
import { TailorService } from '../../services/tailor.service';

@Component({
  selector: 'app-tailors',
  templateUrl: './tailors.component.html',
  styleUrls: ['./tailors.component.css']
})
export class TailorsComponent implements OnInit {

  tailors: Tailor[];

  constructor(
    private tailorService: TailorService
  ) { }

  ngOnInit(): void {
    this.tailorService.getTailors()
      .subscribe(tailors => {
        this.tailors = tailors;
      });
  }

}
