import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormControlDirective} from '@angular/forms'
import { AuctionService } from 'src/app/_services/auction.service';
import { Product } from '../../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.scss']
})
export class AuctionFormComponent implements OnInit {

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
    startDateTime: new FormControl('', [
      Validators.required,
    ]),
    endDateTime: new FormControl('', [
      Validators.required,
    ]),
    isInCountry: new FormControl(''),
    features: new FormArray([
      new FormControl('')
    ])
  })

  countries = [
    {key: 'AUS', value: 'Australia'},
    {key: 'GB', value: 'England'},
    {key: 'CN', value: 'China'},
    {key: 'RU', value: 'Russia'},
    {key: 'IN', value: 'India'},

  ]
  
  constructor(private auctionService: AuctionService, private route: Router) { }

  ngOnInit(): void {
    
  }

  get name(){
    return this.auctionForm.get('name') as FormControl;
  }

  get image(){
    return this.auctionForm.get('image') as FormControl;
  }

  get price(){
    return this.auctionForm.get('price') as FormControl;
  }

  get startDateTime(){
    return this.auctionForm.get('startDateTime') as FormControl;
  }

  get endDateTime(){
    return this.auctionForm.get('endDateTime') as FormControl;
  }

  get isInCountry(){
    return this.auctionForm.get('isInCountry') as FormControl;
  }

  get features(){
    return this.auctionForm.get('features') as FormArray;
  }

  addFeature(){
    this.features.push(new FormControl(''));
  }

  submitForm(){
    this.auctionService.addProduct({...this.auctionForm.value} as Product);
    console.log('Adding your product to Auction');
    this.route.navigate(['admin/auction/list']);
  }

}
