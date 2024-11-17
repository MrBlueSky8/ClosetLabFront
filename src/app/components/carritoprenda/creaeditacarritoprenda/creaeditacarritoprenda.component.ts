import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CarritoPrenda } from '../../../models/carritoprenda';
import { Carrito } from '../../../models/carrito';
import { Prenda } from '../../../models/prenda';
import { CarritoprendaService } from '../../../services/carritoprenda.service';
import { CarritoService } from '../../../services/carrito.service';
import { PrendaService } from '../../../services/prenda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditacarritoprenda',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditacarritoprenda.component.html',
  styleUrl: './creaeditacarritoprenda.component.css'
})
export class CreaeditacarritoprendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  carritoPrenda: CarritoPrenda = new CarritoPrenda();
  id: number = 0;
  edicion:boolean = false;
  carritos: Carrito[] = [];
  prendas: Prenda[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private cpS: CarritoprendaService,
    private cS: CarritoService,
    private pS: PrendaService,
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
      carrito_id: ['', Validators.required],
      prenda_id: ['', Validators.required],
      cantidad: ['', Validators.required]
    });

    this.cS.list().subscribe((data) => {
      this.carritos = data;
    });
    this.pS.list().subscribe((data) => {
      this.prendas = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.carritoPrenda.idcarrito_prenda = this.form.value.codigo;
      this.carritoPrenda.carrito.id = this.form.value.carrito_id;
      this.carritoPrenda.prenda.id = this.form.value.prenda_id;
      this.carritoPrenda.cantidad = this.form.value.cantidad;

      if(this.edicion){
          this.cpS.update(this.carritoPrenda).subscribe((data) => {
            this.cpS.list().subscribe((data) => {
              this.cpS.setList(data);
            });
          });
        }
        else{
          this.cpS.insert(this.carritoPrenda).subscribe((data) => {
            this.cpS.list().subscribe((data) => {
              this.cpS.setList(data);
            });
          });
        }

      this.router.navigate(['carritoPrenda']);
    }
  }

  init(){
    if(this.edicion){
      this.cpS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.idcarrito_prenda),
          carrito_id: new FormControl(data.carrito.id),
          prenda_id: new FormControl(data.prenda.id),
          cantidad: new FormControl(data.cantidad),
        })
      })
    }
  }
}
