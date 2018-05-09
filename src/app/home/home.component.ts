import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { TripHour } from '../trip-hour';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loading = false;

  tripsHours: Array<TripHour> = [];
  tripsPerHour : Array<number> = new Array(24).fill(100);
  max: number = 0;

  constructor(private _homeService: HomeService) { }

  ngOnInit() {
    this.getTravels();
  }
 
  getTravels() {
    this.loading = true;
    this._homeService.getData().subscribe(
       data => { 
          this.tripsHours = data.map(x =>  ({
            startHour : new Date(x.startTime).getHours(),
            endHour: new Date(x.endTime).getHours()
          }));

          this.countTrips();
          this.loading = false;
        },
       err => {
         console.log(err);
         this.loading = false;
        }
     );
   }

  countTrips() {
    this.tripsHours.forEach(val => {
      let duration: number = (val.endHour > val.startHour) ? (val.endHour - val.startHour) : ((val.endHour + 24) - val.startHour);
      let start = val.startHour;
      for(let i = 1; i <= duration + 1; i++) {
        if (start == 24){ 
          this.tripsPerHour[0]++;
          start = 1;
        }
        else{ 
          this.tripsPerHour[start]++;
          start++;
        }

      }
    });

    this.max = Math.max.apply(null, this.tripsPerHour);
  }

  styleSpan(num): Object {
    let height = (num/this.max) * 95;
    let color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","
                       + Math.floor(Math.random() * 255) + ")";
    
    return {'height': height.toString() + '%',
            'background-color': color,
            'margin': '0 2px 0 2px',
            'animation': 'draw 1s ease-in-out'};
  }

}
