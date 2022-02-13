import { Component, OnInit } from '@angular/core';
import { Docente } from './docente';
import { DocenteService } from './docente.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  
  public docentes: Docente[] = [];
  private docenteService: DocenteService;

  constructor(docenteService: DocenteService) { 
    this.docenteService = docenteService;
  }

  ngOnInit(): void {
    this.docenteService.getDocentes().subscribe (
      docentes => this.docentes = docentes
    );

  }

}
