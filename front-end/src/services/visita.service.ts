import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';

const _apiUrl = environment.apiURL + '/visita';

@Injectable({
  providedIn: 'root',
})
export class VisitaService {
  constructor(private http: HttpClient) {}

  createVisitaPerfil(data: any): Observable<any> {
    return this.http.post(`${_apiUrl}/perfil`, data);
  }

  createVisitaPublicacion(data: any): Observable<any> {
    return this.http.post(`${_apiUrl}/publ`, data);
  }

  createContactoPublicacion(data: any): Observable<any> {
    return this.http.post(`${_apiUrl}/contacto`, data);
  }

  getVisitaPerfilByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/perfil/user/${userId}`);
  }

  getVisitaPerfilDistinctByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/perfil/user/dist/${userId}`);
  }

  getVisitaPublicacionByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/user/${userId}`);
  }

  getVisitaPublicacionDistinctByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/user/dist/${userId}`);
  }

  getVisitaPublicacionByPubl(publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/publ/${publId}`);
  }

  getVisitaPublicacionDistinctByPubl(publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/publ/dist/${publId}`);
  }

  getContactoPublicacionByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/contacto/user/${userId}`);
  }

  getContactoPublicacionDistinctByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/contacto/user/dist/${userId}`);
  }

  getContactoPublicacionByPubl(publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/contacto/publ/${publId}`);
  }

  getContactoPublicacionDistinctByPubl(publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/contacto/publ/dist/${publId}`);
  }
}
