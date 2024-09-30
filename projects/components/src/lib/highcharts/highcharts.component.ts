import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'lib-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css'],
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
})
export class HighchartsComponent {
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  @Input() type: 'area' | 'column' | 'bar' | 'line' | 'pie' = 'column';
  @Input() title: string = 'Chart Title';
  @Input() data: number[] = [1, 2, 3];
  ngOnInit() {
    this.chartOptions = {
      credits: {
        enabled: false,
      },
      title: {
        text: this.title,
      },

      series: [
        {
          data: this.data,
          type: this.type,
        },
      ],
    };
  }
  ngOnChanges() {
    this.chartOptions = JSON.parse(
      JSON.stringify({
        credits: {
          enabled: false,
        },
        title: {
          text: this.title,
        },

        series: [
          {
            data: this.data,
            type: this.type,
          },
        ],
      })
    );
  }
}
