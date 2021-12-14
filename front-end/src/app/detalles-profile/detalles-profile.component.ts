import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { VisitaService } from 'src/services/visita.service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-detalles-profile',
  templateUrl: './detalles-profile.component.html',
  styleUrls: ['./detalles-profile.component.css']
})
export class DetallesProfileComponent implements OnInit {
  mediaUrl: string = `${environment.mediaURL}`;
  usuario: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private visitaService: VisitaService
  ) {}

  ngOnInit(): void {
  }

}
