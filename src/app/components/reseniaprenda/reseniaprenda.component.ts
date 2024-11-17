import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListareniaprendaComponent } from './listareniaprenda/listareniaprenda.component';

@Component({
  selector: 'app-reseniaprenda',
  standalone: true,
  imports: [RouterOutlet, ListareniaprendaComponent],
  templateUrl: './reseniaprenda.component.html',
  styleUrl: './reseniaprenda.component.css'
})
export class ReseniaprendaComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
