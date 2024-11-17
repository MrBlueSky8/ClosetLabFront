import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EstadocarritoService } from '../../../services/estadocarrito.service';
import { EstadoCarrito } from '../../../models/estadocarrito';

@Component({
  selector: 'app-listarestadocarrito',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listarestadocarrito.component.html',
  styleUrl: './listarestadocarrito.component.css'
})
export class ListarestadocarritoComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<EstadoCarrito> = new MatTableDataSource();
  constructor(private tuS:EstadocarritoService) {}
  ngOnInit(): void {
    this.tuS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.tuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.tuS.eliminar(id).subscribe((data) => {
      this.tuS.list().subscribe((data) => {
        this.tuS.setList(data);
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
