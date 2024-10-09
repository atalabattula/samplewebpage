import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';


echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);


type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>;

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit, OnDestroy  {
  
  @Input() id!: string;
  private myChart!: echarts.ECharts;  
  option!: EChartsOption;
  chartId!: string;

  constructor() {
    
  }

  ngAfterViewInit(): void {
    console.log('id', this.id);
    
    const chartDom = document.getElementById(this.id);
    this.myChart = echarts.init(chartDom);

    
    this.option = {
      title: {
        text: `Graph${this.id[4]}`,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        {
          name: '2012',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
      ],
    };

    
    this.myChart.setOption(this.option);
  }

 
  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.dispose();
    }
  }
}
