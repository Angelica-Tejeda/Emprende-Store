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

  getOwnUsuarioById(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/own/${userId}`, { withCredentials: true });
  }

  getUsuarioById(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/${userId}`);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${_apiUrl}/`);
  }

  updateUsuarioPassword(userId: number, data: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/password/${userId}`, data, {
      withCredentials: true,
    });
  }

  updateUsuarioFotoPerfil(userId: number, data: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/fotoPerfil/${userId}`, data, {
      withCredentials: true,
    });
  }

  updateUsuarioFotoPortada(userId: number, data: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/fotoPortada/${userId}`, data, {
      withCredentials: true,
    });
  }

  updateUsuario(userId: number, data: any): Observable<any> {
    return this.http.patch(`${_apiUrl}/${userId}`, data, {
      withCredentials: true,
    });
  }

  deleteUsuarioFotoPerfil(userId: number): Observable<any> {
    return this.http.delete(`${_apiUrl}/fotoPerfil/${userId}`, {
      withCredentials: true,
    });
  }

  deleteUsuarioFotoPortada(userId: number): Observable<any> {
    return this.http.delete(`${_apiUrl}/fotoPortada/${userId}`, {
      withCredentials: true,
    });
  }

  deleteUsuario(userId: number): Observable<any> {
    return this.http.delete(`${_apiUrl}/${userId}`, { withCredentials: true });
  }
}
