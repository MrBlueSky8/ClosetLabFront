import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-obteneringresosmensuales',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './obteneringresosmensuales.component.html',
  styleUrl: './obteneringresosmensuales.component.css'
})
export class ObteneringresosmensualesComponent implements OnInit {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private uS: PagoService) {}

  ngOnInit(): void {
    this.uS.getIngresosMensuales().subscribe((data) => {
      this.barChartLables = data.map(item=>item.mes);
      this.barChartData=[
        {
          data:data.map(item=>item.ingresos_mensuales),
          label:'Cantidad de Usuarios',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}
