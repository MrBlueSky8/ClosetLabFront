import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Carrito } from '../../../models/carrito';
import { EstadoCarrito } from '../../../models/estadocarrito';
import { Usuario } from '../../../models/usuario';
import { CarritoService } from '../../../services/carrito.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EstadocarritoService } from '../../../services/estadocarrito.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditacarrito',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditacarrito.component.html',
  styleUrl: './creaeditacarrito.component.css'
})
export class CreaeditacarritoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  carrito: Carrito = new Carrito();
  id: number = 0;
  edicion:boolean = false;
  estadoCarrito: EstadoCarrito[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private eS: CarritoService,
    private uS: UsuarioService,
    private eceS: EstadocarritoService,
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
      estadoCarrito_id: ['', Validators.required],
      user_id: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.eceS.list().subscribe((data) => {
      this.estadoCarrito = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.carrito.id = this.form.value.codigo;
      this.carrito.estadoCarrito.id = this.form.value.estadoCarrito_id;
      this.carrito.usuario.id = this.form.value.user_id;

      if(this.edicion){
          this.eS.update(this.carrito).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }
        else{
          this.eS.insert(this.carrito).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }

      this.router.navigate(['carrito']);
    }
  }

  init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          estadoCarrito_id: new FormControl(data.estadoCarrito.id),
          user_id: new FormControl(data.usuario.id)
        })
      })
    }
  }
}
