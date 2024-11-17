import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoPrenda } from '../../../models/tipoprenda';
import { TipoprendaService } from '../../../services/tipoprenda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditatipoprenda',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditatipoprenda.component.html',
  styleUrl: './creaeditatipoprenda.component.css'
})
export class CreaeditatipoprendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoPrenda: TipoPrenda = new TipoPrenda();
  id: number = 0;
  edicion:boolean = false;

  constructor(
    private formBuilber: FormBuilder,
    private tS: TipoprendaService,
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
      codigo:[''],
      nombre:['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tipoPrenda.id = this.form.value.codigo;
      this.tipoPrenda.nombre = this.form.value.nombre;
      if(this.edicion){
          this.tS.update(this.tipoPrenda).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }
        else{
          this.tS.insert(this.tipoPrenda).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }

      this.router.navigate(['tiposdeprenda']);
    }
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
        })
      })
    }
  }
}
