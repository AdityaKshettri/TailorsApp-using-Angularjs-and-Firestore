import { Component, OnInit, Input } from '@angular/core';

import { Tailor } from '../../models/Tailor';

@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.component.html',
  styleUrls: ['./tailor.component.css']
})
export class TailorComponent implements OnInit {

  @Input() tailor: Tailor;

  constructor() { }

  ngOnInit(): void {
  }

}
