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
    startDate: new FormControl(''),
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
      startDate: moment().toDate(),
      endDate: moment().toDate()
    })
    this.auctionService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filterProducts(this.date.value);
      }
    )

    this.ipService.getLocationData().subscribe(
      data => {
        this.country = data.location.country;
      }
    )

    // const x = setInterval(()=> {
    //   // this.isEntryAllowed()
    // }, 2000)
  }

  ngOnInit(): void {
    this.filterProducts(this.date.value)
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
      const s = moment(date.startDate).startOf('day');
      const e = moment(date.endDate).endOf('day');
      const range = Moment.range(s, e);
    
      if (e.diff(s, 'seconds') > 0){
        this.filteredProducts = this.products.filter(product => {
          const r = Moment.range(product.startDate, product.endDate);
          const bool = (range.contains(moment(product.endDate)) || range.contains(moment(product.startDate)) || r.contains(range)) && this.isAllowedIn(product.country);
          return bool;
        })
      
        this.showProducts = this.showAll ? this.products : this.filteredProducts;
      }
      else this.showProducts = []
    }
  }

  isAllowedIn(allowedCountry: String){
    return this.country === allowedCountry
  }

  isEntryAllowed(product: Product){
      const start = moment(product.startDate);
      const end = moment(product.endDate);
      const range = Moment.range(start, end);

      return range.contains(moment()) && this.isAllowedIn(product.country);
  }

  onCheck(event: any){ 
    this.showAll = event.checked;
    this.showProducts = this.showAll ? this.products : this.filteredProducts;
  }

}
