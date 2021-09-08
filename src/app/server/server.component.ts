import { Component } from "@angular/core";
import { Timestamp } from "rxjs";

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
