import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { Product } from '../product';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { FormControl, FormGroup } from '@angular/forms';
import { IpService } from 'src/app/_services/ip.service';

const Moment = momentRange.extendMoment(moment);

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  date = new FormGroup({
    startDate: new FormControl(),
    endDate : new FormControl('')
  })
  now: Date = moment().toDate();
  products: Product[] = [];
  filteredProducts: Product[] = [];

  showProducts: Product[] = [];
  entry = true;
  country = 'random';
  showAll = false;

  constructor(private auctionService: AuctionService, private ipService: IpService) { 
    this.date.patchValue({
      startDate: moment().toDate()
    })
    this.auctionService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filterProducts(this.date.value);
        console.log(this.date.value)
      }
    )

    this.ipService.getLocationData().subscribe(
      data => {
        this.country = data.location.country
        console.log(this.country)
      }
    )

    const x = setInterval(()=> {
      this.IsEntryAllowed()
    }, 2000)
  }

  ngOnInit(): void {
    this.date.valueChanges.subscribe(
      val => this.filterProducts(val)
    )
  }

  get startDate(){
    return this.date.get('startDate') as FormControl;
  }

  get endDate(){
    return this.date.get('endDate') as FormControl;
  }

  filterProducts(date: any){
    if (date.startDate && date.endDate){
      console.log('Filtering....')
      const s = moment(date.startDate).startOf('day');
      const e = moment(date.endDate).endOf('day');
      const range = Moment.range(s, e);
    
      if (e.diff(s, 'seconds') > 0){
        this.filteredProducts = this.products.filter(product => {
          const r = Moment.range(product.startDateTime, product.endDateTime);
          return (range.contains(moment(product.endDateTime)) || range.contains(moment(product.startDateTime)) || r.contains(range)) && this.IsAllowedIn(product.isInCountry);
          
        })
      
        this.showProducts = this.showAll ? this.products : this.filteredProducts
      }
      else this.showProducts = []
    }
  }

  IsAllowedIn(allowedCountry: String){
    return this.country === allowedCountry
  }

  IsEntryAllowed(){
    this.products.forEach(product => {
      const start = moment(product.startDateTime);
      const end = moment(product.endDateTime);
      const range = Moment.range(start, end);

      product.entry = range.contains(moment()) && this.IsAllowedIn(product.isInCountry)
    })
  }

  onCheck(event: any){ 
    this.showAll = event.checked;
    this.showProducts = this.showAll ? this.products : this.filteredProducts;
  }

}
