import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuctionService } from 'src/app/_services/auction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product = {} as Product;

  constructor(private auctionService: AuctionService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.auctionService.getProductById(id)
    .subscribe(product =>{ 
      this.product = product ? product : {} as Product  
      console.log(this.product);
      this.patchDetails(this.product);
    })

    console.log("Value:", this.auctionForm.value);
  }

  auctionForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    image: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl('', [
      Validators.required,
    ]),
    startDate: new FormControl('',[
      Validators.required
    ]),
    endDate: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl(''),
    features: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl('')
    ])
  })

  get name(){
    return this.auctionForm.get('name') as FormControl;
  }

  get image(){
    return this.auctionForm.get('image') as FormControl;
  }

  get price(){
    return this.auctionForm.get('price') as FormControl;
  }

  get features(){
    return this.auctionForm.get('features') as FormArray;
  }

  addFeature(){
    this.features.push(new FormControl(''));
  }

  patchDetails(product: Product){
    this.auctionForm.patchValue({
      name: product.name,
      price: product.price,
      image: product.image,
      startDate: product.startDate,
      endDate: product.endDate,
      country: product.country,
      features: [...this.product.features],
    })
  }

  saveForm(){
    const product = {...this.auctionForm.value, _id: this.product._id}
    console.log(product);
    this.auctionService.editProduct(product);
    this.router.navigate(['admin/auction/list']);

  }

}
