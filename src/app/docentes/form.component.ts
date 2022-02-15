import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from './docente';
import { DocenteService } from './docente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public docente: Docente = new Docente();
  public titulo: string = 'Crear /Actualizar Docente';
  private router: Router;
  private docenteService: DocenteService;

  lista:string[]=["CC","CE","TI", "NIT"];

  constructor(docenteService: DocenteService, router: Router) { 
    this.docenteService = docenteService;
    this.router = router;
  }

  ngOnInit(): void {
  }

  public crearDocente(): void{
    console.log('form.component.ts createDocente');
    this.docenteService.create(this.docente).subscribe(
      respose => {
        this.router.navigate(['/docentes']);
        swal.fire('Nuevo docente', `Docente <b>${respose.nombres}</b> creado con éxito!`, 'success'); 
      }
    )
  }

  public update():void{
    this.docenteService.update(this.docente).subscribe( docente => {
        this.router.navigate(['/docentes']);
        swal.fire('Docente Actualizado', `Docente <b>${docente.nombres}</p> actualizado con éxito!`, 'success');
      }
    )
  }

}
