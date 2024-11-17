import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiposusuarioComponent } from './listartiposusuario/listartiposusuario.component';

@Component({
  selector: 'app-tipousuario',
  standalone: true,
  imports: [RouterOutlet, ListartiposusuarioComponent],
  templateUrl: './tipousuario.component.html',
  styleUrl: './tipousuario.component.css'
})
export class TipousuarioComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
