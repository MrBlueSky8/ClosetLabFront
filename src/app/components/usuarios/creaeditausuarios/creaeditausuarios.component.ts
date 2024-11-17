import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { TipoUsuario } from '../../../models/tipousuario';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { switchMap } from 'rxjs';
//import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-creaeditausuarios',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditausuarios.component.html',
  styleUrl: './creaeditausuarios.component.css'
})
export class CreaeditausuariosComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion:boolean = false;
  detalle:boolean = false;
  registro:boolean = false;
  lastid: number = 0;
  TiposdeUsuario: TipoUsuario = new TipoUsuario();

  constructor(
    private formBuilber: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private route:ActivatedRoute,
    private tuS:TipousuarioService

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      //llamar a metodo llene el formulario del registro a editar
      this.detalle = data['id'] != null && this.route.snapshot.url.some(segment => segment.path === 'detalle');
      this.registro = this.route.snapshot.url.some(segment => segment.path === 'registro');

      this.init()
    })

    this.form = this.formBuilber.group({
      id:[''],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      contra: ['', Validators.required],
      telefono: ['', Validators.required],
      enabled: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.id = this.form.value.id;
      this.usuario.dni = this.form.value.dni;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.correo = this.form.value.nombre;
      this.usuario.telefono = this.form.value.telefono;

      if (this.form.value.contra) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(this.form.value.contra, salt);
        this.usuario.contra = hashedPassword;
        //const hashedPassword = CryptoJS.SHA256(this.form.value.contra).toString();
        //this.usuario.contra = hashedPassword;
      }


      this.usuario.enabled = this.form.value.enabled;
      if(this.edicion){
          this.uS.update(this.usuario).subscribe((data) => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
          });
        }
        else{
          this.uS.insert(this.usuario).pipe(
            switchMap(() => this.uS.list()),
            switchMap((users) => {
              this.uS.setList(users);
              return this.uS.getUltimoIdRegistrado();
            })
          ).subscribe({
            next: (id) => {
              this.lastid = id;
              this.insertarrol(this.lastid);
              console.log('User ID:', this.lastid);
            },
            error: (err) => {
              console.error('Error during registration process:', err);
            }
          });
        }

        if(this.registro){
          this.router.navigate(['login']);
        }else {
          this.router.navigate(['usuarios']);
        }
    }
  }

  init(){
    if(this.edicion){
      this.uS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          id: new FormControl(data.id),
          dni: new FormControl(data.dni),
          nombre: new FormControl(data.nombre),
          correo: new FormControl(data.correo),
          contra: new FormControl(data.contra),
          telefono: new FormControl(data.telefono),
          enabled: new FormControl(data.enabled),
        })
      })
    }
  }
  
  volver(): void {
    if(this.registro){
      this.router.navigate(['login']);
    }else {
      this.router.navigate(['usuarios']);
    }
    
  }

  insertarrol(iduser:number){

    this.TiposdeUsuario.id = 0;
    this.TiposdeUsuario.nombre = 'CUSTOMER';
    this.TiposdeUsuario.user.id = iduser;

    this.tuS.insert(this.TiposdeUsuario).subscribe();
    console.log('User ID TU:', this.TiposdeUsuario.user.id);
  }
}

