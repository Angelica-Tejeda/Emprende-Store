import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

const _apiUrl = environment.apiURL + '/comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  constructor(private http: HttpClient) {}

  getAllComentariosByUsuario(userId: number): Observable<any> {
    return this.http.get(`${_apiUrl}/user/own/${userId}`);
  }
}
