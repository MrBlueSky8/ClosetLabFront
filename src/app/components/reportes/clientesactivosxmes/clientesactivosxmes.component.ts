import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-clientesactivosxmes',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './clientesactivosxmes.component.html',
  styleUrl: './clientesactivosxmes.component.css'
})
export class ClientesactivosxmesComponent implements OnInit {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='bar';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private uS: PagoService) {}

  ngOnInit(): void {
    this.uS.getClientesActivosxMes().subscribe((data) => {
      this.barChartLables = data.map(item=>item.mes);
      this.barChartData=[
        {
          data:data.map(item=>item.clientes_activos),
          label:'Cantidad de Clientes',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}