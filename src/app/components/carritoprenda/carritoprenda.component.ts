import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcarritoprendaComponent } from './listarcarritoprenda/listarcarritoprenda.component';
import { ListartipoprendaComponent } from "../tipoprenda/listartipoprenda/listartipoprenda.component";

@Component({
  selector: 'app-carritoprenda',
  standalone: true,
  imports: [RouterOutlet, ListarcarritoprendaComponent],
  templateUrl: './carritoprenda.component.html',
  styleUrl: './carritoprenda.component.css'
})
export class CarritoprendaComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}