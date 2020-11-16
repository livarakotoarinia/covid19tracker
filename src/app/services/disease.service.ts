import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countries`);
  }

  getCountry(countryCode): Observable<any> {
    let url =
      countryCode == 'worldwide'
        ? this.http.get(`${this.baseUrl}/all`)
        : this.http.get(`${this.baseUrl}/countries/${countryCode}`);
    return url;
  }

  getData(): Observable<any>{
    return this.http.get(`${this.baseUrl}/historical/all?lastdays=120`);
  }
}
