import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Pago } from '../../../models/pago';
import { MetodoPago } from '../../../models/metodopago';
import { Carrito } from '../../../models/carrito';
import { Usuario } from '../../../models/usuario';
import { PagoService } from '../../../services/pago.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MetodopagoService } from '../../../services/metodopago.service';
import { CarritoService } from '../../../services/carrito.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditapago',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditapago.component.html',
  styleUrl: './creaeditapago.component.css'
})
export class CreaeditapagoComponent  implements OnInit {
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  id: number = 0;
  edicion:boolean = false;
  metodosPagos: MetodoPago[] = [];
  carritos: Carrito[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private eS: PagoService,
    private uS: UsuarioService,
    private mpS: MetodopagoService,
    private cS: CarritoService,
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
      metodoPago_id: ['', Validators.required],
      carrito_id: ['', Validators.required],
      user_id: ['', Validators.required],
      montoTotal: ['', Validators.required],
      fechaPago: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.mpS.list().subscribe((data) => {
      this.metodosPagos = data;
    });
    this.cS.list().subscribe((data) => {
      this.carritos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pago.id = this.form.value.codigo;
      this.pago.metodoPago.id = this.form.value.metodoPago_id;
      this.pago.carrito.id = this.form.value.carrito_id;
      this.pago.usuario.id = this.form.value.user_id;
      this.pago.montoTotal = this.form.value.montoTotal;
      this.pago.fechaPago = this.form.value.fechaPago;

      if(this.edicion){
          this.eS.update(this.pago).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }
        else{
          this.eS.insert(this.pago).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }

      this.router.navigate(['pago']);
    }
  }

  init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          metodoPago_id: new FormControl(data.metodoPago.id),
          carrito_id: new FormControl(data.carrito.id),
          user_id: new FormControl(data.usuario.id),
          montoTotal: new FormControl(data.montoTotal),
          fechaPago: new FormControl(data.fechaPago),
        })
      })
    }
  }
}
