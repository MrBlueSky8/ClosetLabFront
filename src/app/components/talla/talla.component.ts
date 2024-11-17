import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartallaComponent } from './listartalla/listartalla.component';

@Component({
  selector: 'app-talla',
  standalone: true,
  imports: [RouterOutlet, ListartallaComponent],
  templateUrl: './talla.component.html',
  styleUrl: './talla.component.css'
})
export class TallaComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
