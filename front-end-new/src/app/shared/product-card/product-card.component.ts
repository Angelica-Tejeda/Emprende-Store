import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  @Input() related: boolean = false;
  @Input() showOwner: boolean = true;
  mediaUrl: string = environment.mediaURL;

  constructor() { }

  ngOnInit(): void {
  }

}
