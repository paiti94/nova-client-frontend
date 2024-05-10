import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketServiceService } from '../../service/websocket-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, OnDestroy {
public messageToSend: string = '';
  public receivedMessages: string[] = [];
  private messageSubscription!: Subscription;

  constructor(private websocketService: WebsocketServiceService) { }

  ngOnInit(): void {
    this.websocketService.connect('ws://localhost:8080/chat');

    this.messageSubscription = this.websocketService.getMessages().subscribe(
      (message: string) => {
        this.receivedMessages.push(message);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  public sendMessage(): void {
    if (this.messageToSend.trim() !== '') {
      this.websocketService.sendMessage(this.messageToSend);
      this.messageToSend = '';
    }
  }

}
