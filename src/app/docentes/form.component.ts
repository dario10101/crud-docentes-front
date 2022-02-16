import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from './docente';
import { DocenteService } from './docente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public docente: Docente = new Docente();
  public titulo: string = 'Crear / Actualizar Docente';
  private router: Router;
  private docenteService: DocenteService;
  public errors: string[] = [];
  
  // public angForm: FormGroup = this.fb.group({
  //   nombres: ["", [Validators.required, Validators.maxLength(5)]],
  //   apellidos: ["", Validators.required]
  // });

  lista:string[]=["CC","CE","TI", "NIT"];

  constructor(private fb: FormBuilder, docenteService: DocenteService, router: Router) { 
    this.docenteService = docenteService;
    this.router = router; 
  }

  ngOnInit(): void {    
  }

  public crearDocente(): void {
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

  submitCrearDocente() {
    // if (this.angForm.valid) {
    //   console.log(this.angForm.value);
    //   this.crearDocente();
    // } else {
    //   alert("Error! Por favor verifique los campos");
    // }
    //console.log(this.ngForm);
    this.crearDocente();
  }

}
