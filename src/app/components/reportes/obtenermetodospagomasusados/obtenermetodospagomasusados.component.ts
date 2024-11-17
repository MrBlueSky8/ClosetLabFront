import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-obtenermetodospagomasusados',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './obtenermetodospagomasusados.component.html',
  styleUrl: './obtenermetodospagomasusados.component.css'
})
export class ObtenermetodospagomasusadosComponent implements OnInit {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private pS: PagoService) {}

  ngOnInit(): void {
    this.pS.getfrecuenciametodospago().subscribe((data) => {
      this.barChartLables = data.map(item=>item.metodo_pago);
      this.barChartData=[
        {
          data:data.map(item=>item.frecuencia_uso),
          label:'Frecuencia de uso',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}