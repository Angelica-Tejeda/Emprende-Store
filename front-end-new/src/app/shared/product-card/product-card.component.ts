import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  @Input() showOwner: boolean = true;
  mediaUrl: string = environment.mediaURL;

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  redirectTo(uri: string, params: string) {
    this.router.navigateByUrl('.', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri, params]);
    });
  }
}
