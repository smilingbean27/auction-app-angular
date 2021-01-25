import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router} from '@angular/router' ;
import { Product } from '../product';
import { AuctionService } from 'src/app/_services/auction.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product = {} as Product; 
  constructor(private route: ActivatedRoute, private auctionService: AuctionService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.auctionService.getProductById(id)
    .subscribe(product => this.product = product ? product : {} as Product  )

  }

  delete(){
    this.auctionService.removeProduct(this.product);
    this.router.navigate(['admin/auction/list']);

  }

  edit(){
    this.router.navigate([`admin/auction/product/${this.product._id}/edit`])
  }

}
