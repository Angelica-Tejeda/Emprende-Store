import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  foto_perfil: string = '';
  foto_portada: string = '';
  usuario: any;

  constructor(private router: Router, private userS: UsuarioService) {}

  ngOnInit(): void {
    this.userS.getFullUsuarioById().subscribe((data) => {
      this.usuario = data.result;
    });
  }
}
