import { Component } from "@angular/core";
import { fromEvent, Observer, of, interval, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';

  showDetails: boolean = false;
  clicksArray: number[] = [];
  lessThenFive: boolean = true;
  
  myOberver: Observer<string> = {
    next: function(value: string){
      console.log(value)
    },
    error: function(error: Error){
      console.log(error);
    },
    complete: function() {
      console.log('completed');
    }
  }

  // create observable that emits click events
  eventObservable = fromEvent<MouseEvent>(document, 'click');
  ofObservable = of<string>('hello');
  intervalObservable = interval(1000);
  fromObservable = from<string>('hello');

  stringObservable = this.eventObservable.pipe(map(event => `Event time: ${event.timeStamp}`));
  newStringObservable = this.eventObservable.pipe(filter(data => data.clientX > 300 && data.clientY > 300));

  // the output
  subscription = this.stringObservable.subscribe(this.myOberver);
  newSubscription = this.newStringObservable.subscribe((data) => console.log(data));
  ofSubscription = this.ofObservable.subscribe((data) => console.log(data));
  // will throw data on console every second
  // intervalSubscription = this.intervalObservable.subscribe((data) => console.log(data));

  // every element from data coming will be spread and for each obervable is made
  fromSubscription = this.fromObservable.subscribe((data) => console.log(data));

  constructor(){
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus(): string{
    return this.serverStatus;
  }

  getColor(): string {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }

  getButtonInnerHtml(): string {
    return this.showDetails === true ? 'Hide Details' : 'Show Details';
  }

  toggleDetails(event: Event): void {
    this.showDetails = !this.showDetails;
    this.clicksArray.push(event.timeStamp);
  }
}
