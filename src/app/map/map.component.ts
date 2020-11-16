import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
} from '@angular/core';
import * as L from 'leaflet';
import numeral from 'numeral';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  map;
  @Input() zoom: number;
  @Input() center: any;
  @Input() countries: any;
  @Input() casesType: any = 'cases';
  // casesType: any = 'cases';
  casesTypeColors = {
    cases: {
      hex: '#CC1034',
      multiplier: 800,
    },
    recovered: {
      hex: '#7dd71d',
      multiplier: 1200,
    },
    deaths: {
      hex: '#fb4443',
      multiplier: 2000,
    },
  };

  constructor() {}

  // ngAfterViewInit(): void {
  ngOnChanges(): void {
    this.createMap();
  }

  createMap() {
    // when map container change, we need to remove the map to add new data
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map', {
      center: this.center,
      zoom: this.zoom,
    });

    const mainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }
    );

    // add the map
    mainLayer.addTo(this.map);
    // Draw circles on the map with interactive tooltip
    if (this.countries) {
      this.countries.map((country) =>
        new L.Circle([country.countryInfo.lat, country.countryInfo.long], {
          color: this.casesTypeColors[this.casesType].hex,
          fillColor: `${this.casesTypeColors[this.casesType].hex}`,
          fillOpacity: 0.4,
          radius:
            Math.sqrt(country[this.casesType]) *
            this.casesTypeColors[this.casesType].multiplier,
        })
          .bindPopup(
            `<div class="info-container"><div class="info-flag" style="background-image: url(${
              country.countryInfo.flag
            });"></div><div class="info-name">${
              country.country
            }</div><div class="info-confirmed">Cas répertorier: ${numeral(
              country.cases
            ).format(
              '0,0'
            )}</div><div class="info-recovered">Récupération: ${numeral(
              country.recovered
            ).format('0,0')}</div><div class="info-deaths">Décès: ${numeral(
              country.deaths
            ).format('0,0')}</div></div>`
          )
          .addTo(this.map)
      );
    }
  }
}
