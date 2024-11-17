import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariosComponent } from './listarusuarios/listarusuarios.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterOutlet, ListarusuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
