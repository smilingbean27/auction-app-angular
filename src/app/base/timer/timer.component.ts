import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  hours = 0;
  mins = 0;
  secs = 0;
  @Input() startDate: Date = new Date();
  @Input() endDate : Date = new Date();
  message: string = '';

  constructor() { }

  ngOnInit(): void {
    const startTime = new Date(this.startDate).getTime();
    const endTime = new Date(this.endDate).getTime()

    const x = setInterval(
      () => {
        const now = new Date().getTime();

        if (startTime - now > 0){
            const distance = startTime - now;
            this.hours = Math.floor(distance/(60*60*1000));
            this.mins = Math.floor((distance % (60*60*1000))/(60*1000));
            this.secs = Math.floor((distance % (60*1000))/1000);

            this.message = `Starting in: ${this.hours}h:${this.mins}m:${this.secs}s`
        }
        else if (startTime - now <= 0 && endTime - now > 0){
            const distance = endTime - now;
            this.hours = Math.floor(distance/(60*60*1000));
            this.mins = Math.floor((distance % (60*60*1000))/(60*1000));
            this.secs = Math.floor((distance % (60*1000))/1000);

            this.message = `Ending in: ${this.hours}h:${this.mins}m:${this.secs}s`
        } else{
          clearInterval(x);
          this.message = 'Auction is over!'
        }  
      }, 1000)
  }

}
