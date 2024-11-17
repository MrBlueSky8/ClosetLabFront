import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CarritoprendaService } from '../../../services/carritoprenda.service';

@Component({
  selector: 'app-obtenerprendasmasvendidaspormarca',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './obtenerprendasmasvendidaspormarca.component.html',
  styleUrl: './obtenerprendasmasvendidaspormarca.component.css'
})
export class ObtenerprendasmasvendidaspormarcaComponent implements OnInit {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private cpS: CarritoprendaService) {}

  ngOnInit(): void {
    this.cpS.getprendasmasvendidas().subscribe((data) => {
      this.barChartLables = data.map(item=>(item.nombre_marca + "/"+ item.nombre_prenda));
      this.barChartData=[
        {
          data:data.map(item=>item.total_vendido),
          label:'Total vendido',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}