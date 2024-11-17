import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EstadoCarrito } from '../../../models/estadocarrito';
import { EstadocarritoService } from '../../../services/estadocarrito.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditaestadocarrito',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditaestadocarrito.component.html',
  styleUrl: './creaeditaestadocarrito.component.css'
})
export class CreaeditaestadocarritoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  estadoCarrito: EstadoCarrito = new EstadoCarrito();
  id: number = 0;
  edicion:boolean = false;
  //usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private eS: EstadocarritoService,
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
    });

  }

  aceptar(): void {
    if (this.form.valid) {
      this.estadoCarrito.id = this.form.value.codigo;
      this.estadoCarrito.nombre = this.form.value.nombre;

      if(this.edicion){
          this.eS.update(this.estadoCarrito).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }
        else{
          this.eS.insert(this.estadoCarrito).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }

      this.router.navigate(['estadoscarrito']);
    }
  }

  init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.nombre)
        })
      })
    }
  }
}
