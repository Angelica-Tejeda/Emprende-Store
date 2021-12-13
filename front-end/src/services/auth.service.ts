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
    return this.http.post(`${_apiUrl}/loginEmpr`, data);
  }

  actualizarToken(data: any): Observable<any> {
    return this.http.post(`${_apiUrl}/refresh`, data);
  }
}
