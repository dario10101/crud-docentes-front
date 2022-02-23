import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Docente } from './docente';
import { DocenteService } from './docente.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public docente: Docente = new Docente();
  public tituloCrear: string = 'Crear Docente';
  public tituloActualizar: string = 'Actualizar Docente';
  public errors: string[] = [];
  public mapErrors: Map<string, string> = new Map();

  createDocente: boolean = true;
  selectedLI:string = '';

  isMasterSel:boolean;
  categoryList:any;
  checkedCategoryList:any;

  listaTipoIdent: string[] = ["CC","CE","TI", "NIT"];
  listaGenero: string[] = ["Masculino","Femenino","Otro"];
  listaAbreviaturaTitulo: string[] = ["Ing","Doc","Mag"];
  listaGrupoInvestigacion: string[] = ["grupo inv 1", "grupo inv 2", "grupo inv 3"];
  listaTipoVinculacion: string[] = ["Ocasional","Planta","Catedra"];
  listaEscalafon: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"];

  constructor(private docenteService: DocenteService, 
              private router: Router, 
              private route: ActivatedRoute,
              private fb: FormBuilder) { 
    
    this.isMasterSel = false;
    this.categoryList = [
      {id:1,value:'Calidad de proceso y producto',isSelected:false},          
      {id:2,value:'Ingenieria de procesos y linea de producto',isSelected:false},          
      {id:3,value:'Ingenieria de la colaboración y la usabilidad',isSelected:true},         
    ];

    this.getCheckedItemList();
  }

  ngOnInit(): void {    
    this.createDocente = true; 
    this.docente.identificacion = this.route.snapshot.params['identificacion'];

    // desactivar todos
    for (var i = 0; i < this.categoryList.length; i++) {
      console.log(this.categoryList[i].value + '  is selected');
      this.categoryList[i].isSelected = false;
    } 
    
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
      
      // linea de investigacion
      try {  
        // obtener valores seleccionados actuales
        let lineaInvList: string[] = this.docente.lineaInvestigacion.split("|"); 
        console.log('lista linv: ' + lineaInvList);
        if (lineaInvList.length > 0) {
          for (var i = 0; i < this.categoryList.length; i++) {
            for (var j = 0; j < lineaInvList.length; j++) {
              if (this.categoryList[i].value == lineaInvList[j]) {
                console.log(this.categoryList[i].value + '  is selected');
                this.categoryList[i].isSelected = true;
              }
            }
          }
        }
        this.selectedLI = lineaInvList.toString();
      } catch(e){
        console.log('error al cargar linea de investigacion: ' + e);
      }
    }   
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
          this.errors.push("Campo: " + error[0] + ", Error: " + error[1]);
        }
        
        console.error('Código del error desde el backend: ' + err.status);        
      }
    )
  }

  public update():void{
    this.actualizarLineaInvestigacionDocente();

    this.docenteService.update(this.docente).subscribe( docente => {
        this.router.navigate(['/docentes']);
        swal.fire('Docente Actualizado', `Docente <b>${docente.nombres}</p> actualizado con éxito!`, 'success');
      }
    )
  }

  submitCrearDocente() {
    console.log('form.ts: creando docente...');
    console.log(this.categoryList);
    console.log(this.checkedCategoryList);
    this.actualizarLineaInvestigacionDocente();
    this.crearDocente();
  }

  actualizarLineaInvestigacionDocente() {
    this.docente.lineaInvestigacion = '';
    for (var i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].isSelected) {
        this.docente.lineaInvestigacion = this.docente.lineaInvestigacion + this.categoryList[i].value;
        if (i < this.categoryList.length-1) {
          this.docente.lineaInvestigacion = this.docente.lineaInvestigacion + "|";
        }
      }
    }
    console.log('linea investigacion resultante: ' + this.docente.lineaInvestigacion);
  }  

  checkUncheckAll() {
    for (var i = 0; i < this.categoryList.length; i++) {
      this.categoryList[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }   

  isAllSelected() {
    this.isMasterSel = this.categoryList.every(function(item:any) {
        return item.isSelected == true;
    })
    this.getCheckedItemList();
  }  

  getCheckedItemList(){
    this.checkedCategoryList = [];
    for (var i = 0; i < this.categoryList.length; i++) {
      if(this.categoryList[i].isSelected)
      this.checkedCategoryList.push(this.categoryList[i]);
    }
    this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  }
  

}
