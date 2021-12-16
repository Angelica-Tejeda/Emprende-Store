import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
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
  usuario: any;
  constructor( public router: Router, 
    private usuarioService: UsuarioService,
    private cookieService: CookieService,) { 
    
    this.signal=0;
  }
  ngOnInit(): void {
    this.signal=0;
    if (this.cookieService.check("usuario_id")) {
      this.logged = true;
      this.usuarioService.getOwnUsuarioById(+this.cookieService.get("usuario_id")).subscribe((data) => {
        this.usuario = data.result;
      });
    }
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
