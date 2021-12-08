import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';

const _apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  getUsuariosEmpr(): Observable<any> {
    return this.http.get(
      `${_apiUrl}/usuario/empr`
    );
  }

  getFullUsuarioById(): Observable<any> {
    return this.http.get(
      `${_apiUrl}/usuario/full/${localStorage.getItem('id_user')}`
    );
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get(
      `${_apiUrl}/usuario/${id}`
    );
  }

  updatePassword(data: any): Observable<any> {
    return this.http.patch(
      `${_apiUrl}/usuario/password/${localStorage.getItem('id_user')}`, data
    );
  }

  updateFotoPerfil(data: any, type: string): Observable<any> {
    return this.http.patch(
      `${_apiUrl}/usuario/fotoPerfil/${type}/${localStorage.getItem('id_user')}`, data
    );
  }

  deleteFotoPerfil(data: any): Observable<any> {
    return this.http.patch(
      `${_apiUrl}/usuario/fotoPerfilDel/${localStorage.getItem('id_user')}`, data
    );
  }

  updateFotoPortada(data: any, type: string): Observable<any> {
    return this.http.patch(
      `${_apiUrl}/usuario/fotoPortada/${type}/${localStorage.getItem('id_user')}`, data
    );
  }

  deleteFotoPortada(data: any): Observable<any> {
    return this.http.patch(
      `${_apiUrl}/usuario/fotoPortadaDel/${localStorage.getItem('id_user')}`, data
    );
  }

  updateUsuario(data: any): Observable<any> {
    return this.http.patch(
      `${_apiUrl}/usuario/${localStorage.getItem('id_user')}`, data
    );
  }

  deleteUsuario(): Observable<any> {
    return this.http.delete(
      `${_apiUrl}/usuario/${localStorage.getItem('id_user')}`
    );
  }

}
