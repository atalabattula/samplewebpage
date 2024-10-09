import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapsComponent } from './maps/maps.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphComponent } from './graph/graph.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    FormsModule, 
    MapsComponent, 
    GraphComponent,  
    MatTabsModule 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-testing-purpose-project';
  selectedView: string = 'all'; 
  id1: string ="main1";
  id2: string ="main2";

  onViewChange() {
    console.log('Selected view:', this.selectedView);
    
  }
}
