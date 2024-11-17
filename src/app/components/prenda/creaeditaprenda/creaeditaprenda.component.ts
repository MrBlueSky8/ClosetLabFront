import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Prenda } from '../../../models/prenda';
import { Marca } from '../../../models/marca';
import { Talla } from '../../../models/talla';
import { Categoria } from '../../../models/categoria';
import { TipoPrenda } from '../../../models/tipoprenda';
import { PrendaService } from '../../../services/prenda.service';
import { MarcaService } from '../../../services/marca.service';
import { TallaService } from '../../../services/talla.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TipoprendaService } from '../../../services/tipoprenda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditaprenda',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,],
  templateUrl: './creaeditaprenda.component.html',
  styleUrl: './creaeditaprenda.component.css'
})
export class CreaeditaprendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  prenda: Prenda = new Prenda();
  id: number = 0;
  edicion:boolean = false;
  marca: Marca[] = [];
  talla: Talla[] = [];
  categoria: Categoria[] = [];
  tipo: TipoPrenda[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private pS: PrendaService,
    private mS: MarcaService,
    private tS: TallaService,
    private cS: CategoriaService,
    private tipoS: TipoprendaService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      //llamar a metodo llene el formulario del registro a editar

      this.init()
    })

    this.form = this.formBuilber.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descipcion: ['', Validators.required],
      marca_id: ['', Validators.required],
      talla_id: ['', Validators.required],
      categoria_id: ['', Validators.required],
      tipo_id: ['', Validators.required],
      cantidadEnStock: ['', Validators.required]
    });

    this.mS.list().subscribe((data) => {
      this.marca = data;
    });
    this.tS.list().subscribe((data) => {
      this.talla = data;
    });
    this.cS.list().subscribe((data) => {
      this.categoria = data;
    });
    this.tipoS.list().subscribe((data) => {
      this.tipo = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.prenda.id = this.form.value.codigo;
      this.prenda.nombre = this.form.value.nombre;
      this.prenda.descipcion = this.form.value.descipcion;
      this.prenda.marca.id = this.form.value.marca_id;
      this.prenda.talla.id = this.form.value.talla_id;
      this.prenda.categoria.id = this.form.value.categoria_id;
      this.prenda.tipo.id = this.form.value.tipo_id;
      this.prenda.cantidadEnStock = this.form.value.cantidadEnStock;

      if(this.edicion){
          this.pS.update(this.prenda).subscribe((data) => {
            this.pS.list().subscribe((data) => {
              this.pS.setList(data);
            });
          });
        }
        else{
          this.pS.insert(this.prenda).subscribe((data) => {
            this.pS.list().subscribe((data) => {
              this.pS.setList(data);
            });
          });
        }

      this.router.navigate(['prenda']);
    }
  }

  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          descipcion: new FormControl(data.descipcion),
          marca_id: new FormControl(data.marca.id),
          talla_id: new FormControl(data.talla.id),
          categoria_id: new FormControl(data.categoria.id),
          tipo_id: new FormControl(data.tipo.id),
          cantidadEnStock: new FormControl(data.cantidadEnStock)
        })
      })
    }
  }
}
