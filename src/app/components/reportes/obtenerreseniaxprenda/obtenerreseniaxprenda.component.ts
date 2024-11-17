import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerReseñasDePrendaDTO } from '../../../models/obtenerReseñasDePrendaDTO';
import { ReseniaprendaService } from '../../../services/reseniaprenda.service';
import { MatSelectModule } from '@angular/material/select';
import { Prenda } from '../../../models/prenda';
import { PrendaService } from '../../../services/prenda.service';

@Component({
  selector: 'app-obtenerreseniaxprenda',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './obtenerreseniaxprenda.component.html',
  styleUrl: './obtenerreseniaxprenda.component.css'
})
export class ObtenerreseniaxprendaComponent implements OnInit {
  prendas: Prenda[] = [];

  displayedColumns: string[] = [
    'calificacion',
    'comentario',
    'nombre_usuario',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<ObtenerReseñasDePrendaDTO> = new MatTableDataSource();
  form: FormGroup;

  constructor(
    private reseniaService: ReseniaprendaService,
    private formBuilder: FormBuilder,
    private pS: PrendaService,

  ) {
    this.form = this.formBuilder.group({
      id_prenda: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initial data load if necessary
    this.pS.list().subscribe((data) => {
      this.prendas = data;
    });
  }

  getResenias(): void {
    if (this.form.valid) {
      const id_prenda = this.form.value.id_prenda;
      this.reseniaService.getcomentariosporprenda(id_prenda).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}
