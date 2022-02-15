import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Docente } from './docente';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private urlEndPoint: string = 'http://localhost:8085/docentes';
  private getAllUrl = this.urlEndPoint + '/listar';
  private createUrl = this.urlEndPoint + '/crear';
  private updateUrl = this.urlEndPoint + '/editar';
  private deleteUrl = this.urlEndPoint + '/eliminar';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private http: HttpClient;
  
  
  constructor(http: HttpClient) {
    this.http = http;    
  }

  public getDocentes(): Observable<Docente[]>  {
    return this.http.get<Docente[]>(this.getAllUrl);
  }

  public create(docente: Docente) : Observable<Docente> {    
    console.log('docente.service.ts createDocente');
    console.log(docente);
    
    return this.http.post<Docente>(this.createUrl, docente, {
      headers: this.httpHeaders
    });
  }

  public update(docente: Docente): Observable<Docente>{
    return this.http.put<Docente>(`${this.updateUrl}/${docente.identificacion}`,
    docente, {headers: this.httpHeaders})
  }

  public delete(identificacion: string): Observable<Docente>{
    return this.http.delete<Docente>(`${this.deleteUrl}/${identificacion}`, {
        headers: this.httpHeaders
      }
    )
  }

  
    

}
