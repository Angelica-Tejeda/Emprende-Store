import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css'],
})
export class NotAllowedComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private location: Location, 
    private cookieService: CookieService,) {}

  ngOnInit(): void {
    if (this.cookieService.check("usuario_id")) {
      this.isLogged = true;
    }
  }

  goBack() {
    this.location.back();
  }
}
