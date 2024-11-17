import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ObtenerHistorialComprasUsuarioDTO } from '../../../models/obtenerhistorialcomprasusuarioDTO';
import { PagoService } from '../../../services/pago.service';
import { GlobalService } from '../../../services/global.service';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-historialcomprasusuario',
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
  templateUrl: './historialcomprasusuario.component.html',
  styleUrl: './historialcomprasusuario.component.css'
})
export class HistorialcomprasusuarioComponent implements OnInit {
  idGlobal: number = 0;
  userEmail: string = ''; 
  displayedColumns: string[] = [
    'fecha_compra',
    'nombre_prenda',
    'descripcion_prenda',
    'marca',
    'categoria',
    'talla',
    'tipo_prenda',
    'metodo_pago',
    'total_pago'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<ObtenerHistorialComprasUsuarioDTO> = new MatTableDataSource();
  constructor(private gS:PagoService, private globalService: GlobalService, private loginService: LoginService, private usuarioService: UsuarioService) {}
  ngOnInit(): void {
    const email = this.loginService.showUser();
    this.userEmail = email; // Asigna el email al título

    this.usuarioService.findIdByEmail(email).pipe(
      switchMap((id: number) => {
        this.idGlobal = id;
        this.globalService.setMyidSesion(this.idGlobal);
        return this.gS.getHistorialComprasUsuario(this.globalService.getMyidSesion());
      })
    ).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching historial:', err);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /*
  getUserIdByEmail(email: string): void {
    this.usuarioService.findIdByEmail(email).subscribe({
      next: (id: number) => {
        this.idGlobal = id; // Asigna el valor recibido a la variable
        console.log('User ID:', this.idGlobal);
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
      }
    });
  }
    */
}
