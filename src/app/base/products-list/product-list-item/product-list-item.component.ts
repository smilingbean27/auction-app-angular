import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product = {} as Product ;
  
  constructor(){}
  ngOnInit(){}

}
