import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpagoComponent } from './listarpago/listarpago.component';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [RouterOutlet, ListarpagoComponent],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}