import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarpago',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule,
    RouterLink, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css'
})
export class ListarpagoComponent {
  displayedColumns: string[] = [
    'id',
    'metodoPago',
    'carrito',
    'usuario',
    'montoTotal',
    'fechaPago',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private eS:PagoService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.eS.eliminar(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
