import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmarcaComponent } from './listarmarca/listarmarca.component';

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [RouterOutlet, ListarmarcaComponent],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
