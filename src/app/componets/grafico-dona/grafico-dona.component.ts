import { Component, OnInit, Input, Output , EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input() doughnutChartLabels: string[] = [];
  @Input() doughnutChartData: number[] = [];
  @Input() doughnutChartType: string = 'doughnut';


  constructor() { }

  ngOnInit() {
  }

}
