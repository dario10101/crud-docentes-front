import { Component, OnInit } from '@angular/core';

import { Docente } from './docente';
import { DocenteService } from './docente.service';
import swal from 'sweetalert2';


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
  
  
  delete(docente: Docente): void {
    swal.fire({
      title: 'Estas seguro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si,eliminar`,
      denyButtonText: `No, cancelar`,
      }
    ).then((result) => {
        if (result.value) {
          this.docenteService.delete(docente.identificacion).subscribe(
              response => {
                this.docentes = this.docentes.filter(cli => cli !== docente);
                swal.fire(
                  'Cliente Eliminado!',
                  `Cliente ${docente.nombres} eliminado con éxito.`,
                  'success'
                )
            }
          )
        }
      }
    )
  }

}
