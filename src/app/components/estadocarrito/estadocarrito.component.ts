import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarestadocarritoComponent } from './listarestadocarrito/listarestadocarrito.component';

@Component({
  selector: 'app-estadocarrito',
  standalone: true,
  imports: [RouterOutlet, ListarestadocarritoComponent],
  templateUrl: './estadocarrito.component.html',
  styleUrl: './estadocarrito.component.css'
})
export class EstadocarritoComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
