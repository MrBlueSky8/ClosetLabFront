import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmetodopagoComponent } from './listarmetodopago/listarmetodopago.component';

@Component({
  selector: 'app-metodopago',
  standalone: true,
  imports: [RouterOutlet, ListarmetodopagoComponent],
  templateUrl: './metodopago.component.html',
  styleUrl: './metodopago.component.css'
})
export class MetodopagoComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}

