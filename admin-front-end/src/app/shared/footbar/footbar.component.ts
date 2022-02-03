import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footbar',
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.css'],
})
export class FootbarComponent implements OnInit {
  @Input() isHome: boolean = false;
  constructor() {
    
  }

  ngOnInit(): void {}
}
