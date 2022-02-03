import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';

const _apiUrl = environment.apiURL + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  iniciarSesionEmpr(data: any): Observable<any> {
    return this.http.post(`${_apiUrl}/loginAdmin`, data, {
      withCredentials: true,
    });
  }

  cerrarSesion(): Observable<any> {
    return this.http.post(`${_apiUrl}/logout`, null, {
      withCredentials: true,
    });
  }
}
