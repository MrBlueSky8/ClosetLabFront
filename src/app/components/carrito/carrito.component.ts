import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcarritoComponent } from './listarcarrito/listarcarrito.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterOutlet, ListarcarritoComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
