import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';

const _apiUrl = environment.apiURL + '/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getOwnUsuarioById(userId: number, httpOp: any): Observable<any> {
    return this.http.get(`${_apiUrl}/own/${userId}`, httpOp);
  }

  getUsuarioById(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/${userId}`);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${_apiUrl}/`);
  }

  updateUsuarioPassword(userId: number, data: any, httpOp: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/password/${userId}`, data, httpOp);
  }

  updateUsuarioFotoPerfil(userId: number, data: any, httpOp: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/fotoPerfil/${userId}`, data, httpOp);
  }

  updateUsuarioFotoPortada(userId: number, data: any, httpOp: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/fotoPortada/${userId}`, data, httpOp);
  }

  updateUsuario(userId: number, data: any, httpOp: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/${userId}`, data, httpOp);
  }

  deleteUsuarioFotoPerfil(userId: number, httpOp: any): Observable<any> {
    return this.http.delete(`${_apiUrl}/fotoPerfil/${userId}`, httpOp);
  }

  deleteUsuarioFotoPortada(userId: number, httpOp: any): Observable<any> {
    return this.http.delete(`${_apiUrl}/fotoPortada/${userId}`, httpOp);
  }

  deleteUsuario(userId: number, httpOp: any): Observable<any> {
    return this.http.delete(`${_apiUrl}/${userId}`, httpOp);
  }
}
