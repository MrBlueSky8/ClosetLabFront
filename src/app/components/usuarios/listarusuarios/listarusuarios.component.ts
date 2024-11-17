import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent {
  displayedColumns: string[] = [
    'id',
    'dni',
    'nombre',
    'correo',
    'telefono',
    'enabled',
    'verdetalle',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  usuarios: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  constructor(private uS:UsuarioService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.uS.eliminar(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



}
