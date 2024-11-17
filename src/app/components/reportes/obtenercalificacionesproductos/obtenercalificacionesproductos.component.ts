import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerReporteCalificacionesProductosDTO } from '../../../models/obtenerReporteCalificacionesProductosDTO';
import { PrendaService } from '../../../services/prenda.service';

@Component({
  selector: 'app-obtenercalificacionesproductos',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './obtenercalificacionesproductos.component.html',
  styleUrl: './obtenercalificacionesproductos.component.css'
})
export class ObtenercalificacionesproductosComponent implements OnInit {
  displayedColumns: string[] = [
    'prenda_id',
    'nombre_prenda',
    'descripcion_prenda',
    'marca',
    'categoria',
    'promedio_calificacion',
    'comentarios',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<ObtenerReporteCalificacionesProductosDTO> = new MatTableDataSource();
  constructor(private pS:PrendaService) {}
  ngOnInit(): void {
    this.pS.getpromediopuntajeporprenda().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);  
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
