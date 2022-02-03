import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

const _apiUrl = environment.apiURL + '/publicacion';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  constructor(private http: HttpClient) {}

  createPublicacion(): Observable<any> {
    return this.http.post(`${_apiUrl}`, null, { withCredentials: true });
  }

  getCategorias(): Observable<any> {
    return this.http.get(`${_apiUrl}/categ`);
  }

  getOwnPublicacionesByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/own/user/${userId}`, {
      withCredentials: true,
    });
  }

  getMinPublicacionesByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/min/user/${userId}`, {
      withCredentials: true,
    });
  }

  getPublicacionesBySearch(search: string): Observable<any> {
    return this.http.get(`${_apiUrl}/search/${search}`);
  }

  getOwnPublicacionById(userId: number, publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/own/${userId}/${publId}`, {
      withCredentials: true,
    });
  }

  getDiscountPublicaciones(): Observable<any> {
    return this.http.get(`${_apiUrl}/descuento`);
  }

  getPublicacionesByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/user/${userId}`);
  }

  getPublicacionById(publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/${publId}`);
  }

  /*getPublicaciones(): Observable<any> {
    return this.http.get(`${_apiUrl}`);
  }*/

  updatePublicacionFoto(
    userId: number,
    publId: number,
    data: any
  ): Observable<any> {
    return this.http.patch(`${_apiUrl}/foto/${userId}/${publId}`, data, {
      withCredentials: true,
    });
  }

  updatePublicacionActivo(userId: number, publId: number): Observable<any> {
    return this.http.patch(`${_apiUrl}/activo/${userId}/${publId}`, null, {
      withCredentials: true,
    });
  }

  updatePublicacion(
    userId: number,
    publId: number,
    data: any
  ): Observable<any> {
    return this.http.patch(`${_apiUrl}/${userId}/${publId}`, data, {
      withCredentials: true,
    });
  }

  deletePublicacionFoto(
    userId: number,
    publId: number,
    filename: string
  ): Observable<any> {
    return this.http.delete(`${_apiUrl}/foto/${userId}/${publId}/${filename}`, {
      withCredentials: true,
    });
  }

  deletePublicacion(userId: number, publId: number): Observable<any> {
    return this.http.delete(`${_apiUrl}/${userId}/${publId}`, {
      withCredentials: true,
    });
  }
}
