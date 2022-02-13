import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';  
import { Docente } from './docente';
import { DOCENTES } from './docentes.json';
import {Observable} from 'rxjs';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private urlEndPoint: string = 'http://localhost:8085/docentes/listar';
  private http: HttpClient;
  
  constructor(http: HttpClient) {
    this.http = http;
  }

  getDocentes(): Observable<Docente[]>  {
    return this.http.get<Docente[]>(this.urlEndPoint);
  }

}
