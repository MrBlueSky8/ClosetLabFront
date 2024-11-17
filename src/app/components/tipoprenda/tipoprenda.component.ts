import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipoprendaComponent } from './listartipoprenda/listartipoprenda.component';

@Component({
  selector: 'app-tipoprenda',
  standalone: true,
  imports: [RouterOutlet, ListartipoprendaComponent],
  templateUrl: './tipoprenda.component.html',
  styleUrl: './tipoprenda.component.css'
})
export class TipoprendaComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
