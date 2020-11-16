import { Component, OnInit, Input } from '@angular/core';
import numeral from 'numeral';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() countries: any;
  constructor() {}

  ngOnInit(): void {}

  numeral(cases) {
    return numeral(cases).format(',');
  }
}
