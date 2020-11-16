import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DiseaseService } from './services/disease.service';
import { sortData, prettyPrintStat } from './utils/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'covid19-tracker';
  form = new FormGroup({ country: new FormControl('') });
  selectCountry = new FormControl();

  today = new Date().toLocaleDateString();

  countries;
  country = 'worldwide';
  countryInfo;
  tableData;
  mapCenter: any = { lat: 34.80746, lng: -40.4796 };
  mapZoom = 3;
  mapCountries;
  casesType = "cases";

  constructor(private disease: DiseaseService) {}
  ngOnInit() {
    this.getCountriesData();
    this.worldwideMap(this.country);
  }
  prettyPrintStat(stat){
    return prettyPrintStat(stat);
  }

  getCountriesData() {
    this.disease.getCountries().subscribe((response) => {
      const countries = response.map((country) => ({
        name: country.country, // United States, France
        value: country.countryInfo.iso2, // UK, USA; FRA
      }));

      const sortedData = sortData(response);
      this.tableData = sortedData;
      this.mapCountries = response;
      this.countries = countries;
    });
  }

  worldwideMap(props) {
    this.disease.getCountry(props).subscribe((response) => {
      this.countryInfo = response;
    });
  }

  onCountryChange(ev) {
    let props = ev == 'worldwide' ? 'worldwide' : ev.target.value;
    this.disease.getCountry(props).subscribe((response) => {
      this.countryInfo = response;
      this.mapCenter = [response.countryInfo.lat, response.countryInfo.long];
      this.mapZoom = 4;
    });
  }

  changeCasesType(casesType){
    this.casesType = casesType;    
  }
}
