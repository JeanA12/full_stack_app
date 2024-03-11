import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  private urlToCall = "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=13ace172fb2979f69ef1ed16b0df342a"

  private urlMyApi = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  getData():string{
    return "Hello from service";
  }

  getWeatherData():Observable<any>{
    return this.http.get(this.urlToCall,{ responseType : 'text'});
  }

  getMyData():Observable<any>{
    return this.http.get(this.urlMyApi,{responseType : 'text'})
  }
}
