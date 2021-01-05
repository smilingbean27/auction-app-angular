import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { Observable, of } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products : Product[] = []

  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.auctionService.getProducts()
    .subscribe(products => this.products = products)
  }

}
