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

  get timePeriod(){
    return this.auctionForm.get('timePeriod') as FormControl;
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
      startDateTime: product.startDateTime,
      endDateTime: product.endDateTime,
      features: [...this.product.features]
    })
  }

  submitForm(){
    const product = {...this.auctionForm.value, id: this.product.id}
    console.log(product);
    this.auctionService.editProduct(product);
    this.router.navigate(['admin/auction/list']);

  }

}
