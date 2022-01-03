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

  getVisitaPerfilByUsuario(
    userId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(`${_apiUrl}/perfil/user/${userId}/${inicio}/${final}`);
  }

  getVisitaPerfilDistinctByUsuario(
    userId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(
      `${_apiUrl}/perfil/user/dist/${userId}/${inicio}/${final}`
    );
  }

  getVisitaPublicacionByUsuario(
    userId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/user/${userId}/${inicio}/${final}`);
  }

  getVisitaPublicacionDistinctByUsuario(
    userId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(
      `${_apiUrl}/publ/user/dist/${userId}/${inicio}/${final}`
    );
  }

  getVisitaPublicacionByPubl(
    publId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/publ/${publId}/${inicio}/${final}`);
  }

  getVisitaPublicacionDistinctByPubl(
    publId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(
      `${_apiUrl}/publ/publ/dist/${publId}/${inicio}/${final}`
    );
  }

  getContactoPublicacionByUsuario(
    userId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(
      `${_apiUrl}/contacto/user/${userId}/${inicio}/${final}`
    );
  }

  getContactoPublicacionDistinctByUsuario(
    userId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(
      `${_apiUrl}/contacto/user/dist/${userId}/${inicio}/${final}`
    );
  }

  getContactoPublicacionByPubl(
    publId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(
      `${_apiUrl}/contacto/publ/${publId}/${inicio}/${final}`
    );
  }

  getContactoPublicacionDistinctByPubl(
    publId: number,
    inicio: any,
    final: any
  ): Observable<any> {
    return this.http.get(
      `${_apiUrl}/contacto/publ/dist/${publId}/${inicio}/${final}`
    );
  }
}
