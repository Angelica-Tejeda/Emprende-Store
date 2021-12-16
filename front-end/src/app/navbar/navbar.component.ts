import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  signal:any=0;
  logged:boolean=false;
  constructor( public router: Router) { 
    
    this.signal=0;
  }
  ngOnInit(): void {
    this.signal=0;
  }
  toggleHamburguer(){
    if(this.signal == 0){
      $('.nav-content-mobile').css({"display":"flex","flex-direction":"column","height":"90vh","align-items":"center"});
      this.signal=1;
    }else{
      this.signal=0;
      $('.nav-content-mobile').css({"display":"none"});
    }
  }
  redirect(){
    this.router.navigate(['landing-page']);
  }

}
