import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditamarca',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditamarca.component.html',
  styleUrl: './creaeditamarca.component.css'
})
export class CreaeditamarcaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  marca: Marca = new Marca();
  id: number = 0;
  edicion:boolean = false;

  constructor(
    private formBuilber: FormBuilder,
    private tS: MarcaService,
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
      this.marca.id = this.form.value.codigo;
      this.marca.nombre = this.form.value.nombre;
      if(this.edicion){
          this.tS.update(this.marca).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }
        else{
          this.tS.insert(this.marca).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }

      this.router.navigate(['marca']);
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
