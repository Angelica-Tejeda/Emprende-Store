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

  getAllComentariosByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/user/own/${userId}`, {
      withCredentials: true,
    });
  }

  getComentariosByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/user/${userId}`);
  }

  getOwnComentariosByNullPublicacion(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/own/${userId}/null`, {
      withCredentials: true,
    });
  }

  getOwnComentariosByPublicacion(userId: number, publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/own/${userId}/${publId}`, {
      withCredentials: true,
    });
  }

  getComentariosByPublicacion(userId: number, publId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/publ/${userId}/${publId}`);
  }

  updateComentarioOculto(data: any): Observable<any> {
    return this.http.patch(`${_apiUrl}`, data, {
      withCredentials: true,
    });
  }
}
