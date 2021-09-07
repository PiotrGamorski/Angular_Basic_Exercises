import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarningAlertService {

  constructor(private httpClient: HttpClient) { }

  getTextFromFile(theUrl: string): Observable<string> {
    return this.httpClient
    .get<string>(theUrl, { responseType: 'text' as 'json'});
  }
}
