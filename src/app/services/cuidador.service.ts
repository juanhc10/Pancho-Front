import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CuidadorDto {
  nombre: string;
  idioma: string;
  panchoPuntos: number;
  puedeCuidarExotica: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CuidadorService {
  private apiUrl = 'http://localhost:8080/api/v1/cuidadores';

  constructor(private http: HttpClient) {}

  getCuidadores(): Observable<CuidadorDto[]> {
    return this.http.get<CuidadorDto[]>(this.apiUrl);
  }
}
