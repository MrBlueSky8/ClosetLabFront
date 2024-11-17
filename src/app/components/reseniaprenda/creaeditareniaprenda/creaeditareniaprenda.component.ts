import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReseniaPrenda } from '../../../models/reseniaprenda';
import { Prenda } from '../../../models/prenda';
import { Usuario } from '../../../models/usuario';
import { ReseniaprendaService } from '../../../services/reseniaprenda.service';
import { UsuarioService } from '../../../services/usuario.service';
import { PrendaService } from '../../../services/prenda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditareniaprenda',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditareniaprenda.component.html',
  styleUrl: './creaeditareniaprenda.component.css'
})
export class CreaeditareniaprendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reseniaPrenda: ReseniaPrenda = new ReseniaPrenda();
  id: number = 0;
  edicion:boolean = false;
  prenda: Prenda[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private repS: ReseniaprendaService,
    private uS: UsuarioService,
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
      prenda_id: ['', Validators.required],
      usuario_id: ['', Validators.required],
      comentario: ['', Validators.required],
      calificacion: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.usuarios = data;
    });
    this.pS.list().subscribe((data) => {
      this.prenda = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reseniaPrenda.id = this.form.value.codigo;
      this.reseniaPrenda.prenda.id = this.form.value.prenda_id;
      this.reseniaPrenda.usuario.id = this.form.value.usuario_id;
      this.reseniaPrenda.comentario = this.form.value.comentario;
      this.reseniaPrenda.calificacion = this.form.value.calificacion;

      if(this.edicion){
          this.repS.update(this.reseniaPrenda).subscribe((data) => {
            this.repS.list().subscribe((data) => {
              this.repS.setList(data);
            });
          });
        }
        else{
          this.repS.insert(this.reseniaPrenda).subscribe((data) => {
            this.repS.list().subscribe((data) => {
              this.repS.setList(data);
            });
          });
        }

      this.router.navigate(['reseñaprenda']);
    }
  }

  init(){
    if(this.edicion){
      this.repS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          prenda_id: new FormControl(data.prenda.id),
          usuario_id: new FormControl(data.usuario.id),
          comentario: new FormControl(data.comentario),
          calificacion: new FormControl(data.calificacion),
        })
      })
    }
  }
}
