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
    blockInCountry: new FormControl(''),
    features: new FormArray([
      new FormControl('')
    ])
  })

  countries = [
    {key: 'aus', value: 'Australia'},
    {key: 'eng', value: 'England'},
    {key: 'chi', value: 'China'},
    {key: 'rus', value: 'Russia'}
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

  get blockInCountry(){
    return this.auctionForm.get('blockInCountry') as FormControl;
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
