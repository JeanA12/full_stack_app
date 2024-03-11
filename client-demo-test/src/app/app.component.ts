import { Component, OnInit } from '@angular/core';
import { DemoService } from './services/demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-demo-test';
  data?:string;
  meteo?:string;
  mydata?:string;
    constructor (private demoService:DemoService){}
  
    ngOnInit(){
    this.data = this.demoService.getData();
    this.demoService.getWeatherData().subscribe(
      (str) => {
        this.meteo = str;
      }
    );
    this.demoService.getMyData().subscribe(
      str => {
        this.mydata = str;
      });
  }


}
