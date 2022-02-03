import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';

const _apiUrl = environment.apiURL + '/comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  constructor(private http: HttpClient) {}

  createComentario(data: any): Observable<any> {
    return this.http.post(`${_apiUrl}`, data);
  }

  getOwnComentariosByUsuario(
    userId: number,
    queryParams?: any
  ): Observable<any> {
    return this.http.get(`${_apiUrl}/user/own/${userId}`, {
      params: queryParams ? queryParams : undefined,
      withCredentials: true,
    });
  }

  getOwnComentariosByPublicacion(
    userId: number,
    publId: number,
    queryParams?: any
  ): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/own/${userId}/${publId}`, {
      params: queryParams ? queryParams : undefined,
      withCredentials: true,
    });
  }

  getComentariosByPublicacion(
    userId: number,
    publId: number,
    queryParams?: any
  ): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/${userId}/${publId}`, {
      params: queryParams ? queryParams : undefined,
    });
  }

  updateComentarioOculto(
    userId: number,
    comentId: number,
    data: any
  ): Observable<any> {
    return this.http.patch(`${_apiUrl}/oculto/${userId}/${comentId}`, data, {
      withCredentials: true,
    });
  }
}
