import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

const _apiUrl = environment.apiURL + '/publicacion';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  getOwnPublicacionesByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/own/user/${userId}`);
  }

  getOwnPublicacionById(userId: number, publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/own/${userId}/${publId}`);
  }

  getPublicacionesByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/user/${userId}`);
  }

  getPublicacionById(publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/${publId}`);
  }
}
