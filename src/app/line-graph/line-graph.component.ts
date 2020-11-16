import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DiseaseService } from '../services/disease.service';
import numeral from "numeral";

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnChanges {

  data;
  xData = [];
  @Input() casesType = "cases";
  constructor(private disease: DiseaseService) { }

  ngOnChanges(): void {
    console.log("sssd", this.casesType);
    
    this.getData();
  }

  
  buildChartData(data, casesType="cases"){
    const chartData = [];
    let lastDataPoint;

    // data[casesType].forEach(date => {
    for(let date in data.cases) {
      if(lastDataPoint){
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  }
  
  getData(){
    this.disease.getData().subscribe(response => {
      const chartData = this.buildChartData(response, this.casesType); 
      // the data of the graph reinitialize to 0 when click new cases
      this.xData = [];
      this.data = chartData;
      this.data.forEach(element => {
        this.lineChartLabels.push(element.x);
        this.xData.push(element.y);
      });
      this.lineChartData = [{data: this.xData}]
    })
  }

  lineChartData: ChartDataSets[] = [{}];


  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 0
      }
    },
    maintainAspectRation: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0.0");
        }
      }
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "MM/DD/YY",
            tooltipFormat: "ll",
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            }
          }
        }
      ]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#CC1060',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';
}
