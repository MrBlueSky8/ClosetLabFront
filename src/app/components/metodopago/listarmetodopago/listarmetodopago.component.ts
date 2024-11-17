import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MetodoPago } from '../../../models/metodopago';
import { MetodopagoService } from '../../../services/metodopago.service';

@Component({
  selector: 'app-listarmetodopago',
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
  templateUrl: './listarmetodopago.component.html',
  styleUrl: './listarmetodopago.component.css'
})
export class ListarmetodopagoComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<MetodoPago> = new MatTableDataSource();
  constructor(private tS:MetodopagoService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;   
    });
  }
  eliminar(id: number) {
    this.tS.eliminar(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
