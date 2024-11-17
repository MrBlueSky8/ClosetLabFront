import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoUsuario } from '../../../models/tipousuario';
import { Usuario } from '../../../models/usuario';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditatiposusuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditatiposusuario.component.html',
  styleUrl: './creaeditatiposusuario.component.css'
})
export class CreaeditatiposusuarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  TiposdeUsuario: TipoUsuario = new TipoUsuario();
  id: number = 0;
  edicion:boolean = false;
  usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private tS: TipousuarioService,
    private uS: UsuarioService,
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
      user_id: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.TiposdeUsuario.id = this.form.value.codigo;
      this.TiposdeUsuario.nombre = this.form.value.nombre;
      this.TiposdeUsuario.user.id = this.form.value.user_id;

      if(this.edicion){
          this.tS.update(this.TiposdeUsuario).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }
        else{
          this.tS.insert(this.TiposdeUsuario).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }

      this.router.navigate(['tiposdeusuario']);
    }
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          user_id: new FormControl(data.user.id)
        })
      })
    }
  }
}
