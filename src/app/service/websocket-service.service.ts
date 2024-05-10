import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
 private socket$!: WebSocketSubject<any>;

  constructor() { }

  public connect(url: string): void {
    this.socket$ = webSocket(url);
  }

  public sendMessage(message: string): void {
    this.socket$.next(message);
  }

  public getMessages(): Observable<string> {
    return this.socket$.asObservable();
  }
  
}
