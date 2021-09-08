import { Component } from "@angular/core";
import { fromEvent, Observer } from 'rxjs';
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

  //create observable that emits click events
  source = fromEvent<MouseEvent>(document, 'click');
  //map to string with given event timestamp
  example = this.source.pipe(map(event => `Event time: ${event.timeStamp}`));
  example2 = this.source.pipe(filter(data => data.clientX > 300 && data.clientY > 300));

  //output
  // subscription = this.example.subscribe((value) => console.log(value));
  subscription = this.example.subscribe(this.myOberver);
  subscription2 = this.example2.subscribe((data) => console.log(data));

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
