import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { LoginService } from './services/login.service';
import { GlobalService } from './services/global.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClosetLabFrontEnd';

  role: string = '';
  user: string = '';
  idGlobal: number = 0;
  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    this.user = this.loginService.showUser();

    return this.loginService.verificar();
  }
  isAdmin() {
    //this.getUserIdByEmail(this.loginService.showUser());
    
    //this.globalService.setMyidSesion(this.idGlobal);
    return this.role === 'ADMIN';
  }

  isCustomer() {
    return this.role === 'CUSTOMER';
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
