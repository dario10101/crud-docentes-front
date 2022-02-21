import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public errors: string[] = [];
  public mapErrors: Map<string, string> = new Map();

  // form: FormGroup;
  createDocente: boolean = true;
  // isAddMode: boolean;

  listaTipoIdent: string[] = ["CC","CE","TI", "NIT"];
  listaGenero: string[] = ["Masculino","Femenino","Otro"];
  listaAbreviaturaTitulo: string[] = ["Ing","Doc","Mag"];
  listaGrupoInvestigacion: string[] = ["grupo inv 1", "grupo inv 2", "grupo inv 3"];
  listaTipoVinculacion: string[] = ["Ocasional","Planta","Catedra"];

  constructor(private docenteService: DocenteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.createDocente = true; 
    this.docente.identificacion = this.route.snapshot.params['identificacion'];
    
    // Para actualizar
    if (this.docente.identificacion !== undefined) {
      this.createDocente = false;

      this.docente.tipoIdentificacion = this.route.snapshot.params['tipoIdentificacion'];
      this.docente.nombres = this.route.snapshot.params['nombres'];
      this.docente.apellidos = this.route.snapshot.params['apellidos'];
      this.docente.genero = this.route.snapshot.params['genero'];
      this.docente.telefono = this.route.snapshot.params['telefono'];
      this.docente.correo = this.route.snapshot.params['correo'];
      this.docente.titulo = this.route.snapshot.params['titulo'];
      this.docente.abreviaturaTitulo = this.route.snapshot.params['abreviaturaTitulo'];
      this.docente.universidadTitulo = this.route.snapshot.params['universidadTitulo'];
      this.docente.categoriaMinciencias = this.route.snapshot.params['categoriaMinciencias'];
      this.docente.linkCvLac = this.route.snapshot.params['linkCvLac'];
      this.docente.facultad = this.route.snapshot.params['facultad'];
      this.docente.deparmamento = this.route.snapshot.params['deparmamento'];
      this.docente.grupoInvestigacion = this.route.snapshot.params['grupoInvestigacion'];
      this.docente.lineaInvestigacion = this.route.snapshot.params['lineaInvestigacion'];
      this.docente.tipoVinculacion = this.route.snapshot.params['tipoVinculacion'];
      this.docente.escalafon = this.route.snapshot.params['escalafon'];
      this.docente.observacion = this.route.snapshot.params['observacion'];
    } 

    console.log('form component onInit: docente: ');
    console.log(this.docente);
  }

  public crearDocente(): void {
    console.log('form.component.ts createDocente');
    this.docenteService.create(this.docente).subscribe(
      respose => {
        this.router.navigate(['/docentes']);
        swal.fire('Nuevo docente', `Docente <b>${respose.nombres}</b> creado con éxito!`, 'success'); 
      },
      err => {  
        this.errors = [];    
        this.mapErrors = err.error.errors as Map<string, string>;
        
        this.mapErrors = new Map(Object.entries(this.mapErrors));
        console.log(this.mapErrors);

        for(let error of this.mapErrors.entries()) {
          console.log(error + "\n");
          this.errors.push(error.toString());
        }
        
        console.error('Código del error desde el backend: ' + err.status);        
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
    console.log('form.ts: creando docente...');
    this.crearDocente();
  }

}
