import { Component, OnInit } from '@angular/core';
import { MovimientoService } from 'src/services/movimiento.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent implements OnInit {
  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {}
}
