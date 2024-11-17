import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { FiltrarProductosPorTallaYMarcaDTO } from '../../../models/filtrarProductosPorTallaYMarcaDTO';
import { PrendaService } from '../../../services/prenda.service';
import { Talla } from '../../../models/talla';
import { Marca } from '../../../models/marca';
import { TallaService } from '../../../services/talla.service';
import { MarcaService } from '../../../services/marca.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filtrarprendasxtallaymarca',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './filtrarprendasxtallaymarca.component.html',
  styleUrl: './filtrarprendasxtallaymarca.component.css'
})
export class FiltrarprendasxtallaymarcaComponent implements OnInit {
  tallas: Talla[] = [];
  marcas: Marca[] = [];

  displayedColumns: string[] = [
    'prenda_id',
    'nombre_prenda',
    'descripcion_prenda',
    'marca',
    'talla',
    'categoria',
    'cantidadEnStock',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<FiltrarProductosPorTallaYMarcaDTO> = new MatTableDataSource();
  form: FormGroup;

  constructor(
    private prendasService: PrendaService,
    private formBuilder: FormBuilder,
    private tS: TallaService,
    private mS: MarcaService,

    
  ) {
    this.form = this.formBuilder.group({
      id_talla: ['', Validators.required],
      id_marca: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initial data load if necessary
    this.tS.list().subscribe((data) => {
      this.tallas = data;
    });
    this.mS.list().subscribe((data) => {
      this.marcas = data;
    });
  }

  getPrendaspostFiltro(): void {
    if (this.form.valid) {
      const id_talla = this.form.value.id_talla;
      const id_marca = this.form.value.id_marca;
      this.prendasService.getFiltradoporTallaYMarca(id_talla, id_marca).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}
