import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcategoriaComponent } from './listarcategoria/listarcategoria.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [RouterOutlet, ListarcategoriaComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
