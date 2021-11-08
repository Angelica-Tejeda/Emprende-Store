import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  
})



export class LandingPageComponent implements OnInit {
  
  signal:any=0;
  constructor() { 
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

}
