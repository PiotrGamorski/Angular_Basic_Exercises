import { Component, OnInit } from '@angular/core';
import { WarningAlertService } from '../services/warning-alert.service';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css']
})
export class WarningAlertComponent implements OnInit {

  constructor(private warningAlertService: WarningAlertService) {
    setTimeout(()=>{
      this.allowNewMessage = true;
    }, 2000)
   }

  inputMessage: string = "";
  message: string = "";
  txtFileData: string = "";
  allowNewMessage: boolean = false;

  //username exercise
  username: string = "";
  usernameCreated: boolean =false;

  displayMessage(): void {
    let theId: string = "warn-response";

    if(!document.getElementById(theId) && this.message.trim() !=="") {
      let div = document.createElement("div");

      let textNode  = document.createTextNode(this.message);
      div.appendChild(textNode);
      document.getElementById("warn-container")?.appendChild(div);

      // set the id for the div created
      div.setAttribute("id", theId);

      //set the style for this div
      let style = document.createElement("style");
      style.innerHTML = `#warn-response{
        color:crimson
      }
      .warn{}
      `
      div.appendChild(style);
    }

    this.loadTxtFileData();
    //this.loadTxtDataByFetch();
  } 

  private loadTxtFileData(): void {
    this.warningAlertService.getTextFromFile('http://localhost:4200/assets/files/myText.txt')
    .subscribe(data => {
      this.txtFileData = data;
      console.log(this.txtFileData);
    })
  }

  private loadTxtDataByFetch(): void {
    fetch('http://localhost:4200/assets/files/myText.txt')
    .then(response => response.text())
    .then(data => console.log('temp', data))
  }

  updateInput(event: Event): void {
    this.inputMessage = (<HTMLInputElement>event.target).value;
  }

  disableUsername(): boolean{
    return this.username === "" || this.username.trim() == "" ? true : false;
  }

  sendUsername(theUsername: string): void {
    let p = document.getElementById("username");

    if(p !== null){
      p.innerText = theUsername;
    }
    
    this.username = "";
  }

  resetUsername(): void {
    this.username = "";
  }

  ngOnInit(): void {
  }

}
