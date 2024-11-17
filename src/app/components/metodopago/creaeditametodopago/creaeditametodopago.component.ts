import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MetodoPago } from '../../../models/metodopago';
import { MetodopagoService } from '../../../services/metodopago.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditametodopago',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditametodopago.component.html',
  styleUrl: './creaeditametodopago.component.css'
})
export class CreaeditametodopagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  metodoPago: MetodoPago = new MetodoPago();
  id: number = 0;
  edicion:boolean = false;

  constructor(
    private formBuilber: FormBuilder,
    private tS: MetodopagoService,
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
      this.metodoPago.id = this.form.value.codigo;
      this.metodoPago.nombre = this.form.value.nombre;
      if(this.edicion){
          this.tS.update(this.metodoPago).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }
        else{
          this.tS.insert(this.metodoPago).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }

      this.router.navigate(['metodopago']);
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
