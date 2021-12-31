import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footbar',
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.css']
})
export class FootbarComponent implements OnInit {
  public url: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.url = this.router.url;
  }

}
