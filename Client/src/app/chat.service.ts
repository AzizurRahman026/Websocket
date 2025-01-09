import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public connection : any = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/chat")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();// build connection not started connection yet...

  public messages$ = new BehaviorSubject<any[]>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    console.log("called started connection...1");
    this.start();
    console.log("called started connection...2");
    this.connection.on("ReceiveMessage", (user: string, message: string, messageTime: string) => {
      console.log("User: ", user );
      console.log("Message: ", message );
      console.log("MessageTime: ", messageTime );
      this.messages = [...this.messages, {user, message, messageTime}];
      this.messages$.next(this.messages);
    });

    this.connection.on("ConnectedUser", (users: any) => {
      console.log("ConnectedUser: ", users);
      this.connectedUsers$.next(users);
    });
  }

  // start connection
  public async start() {
    try {
      await this.connection.start();
      console.log("Started connection...");
    } catch (error) {
      console.error("Connection failed. Retrying Again...", error);
      setTimeout(() => this.start(), 5000); // Retry after 5 seconds
    }
  }
  

  // Join Room
  public async joinRoom(user: string, room: string) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      console.log("Join Room Calling...");
      return this.connection.invoke("JoinRoom", { user, room });
    } else {
      console.error("Connection is not in the 'Connected' state.");
    }
  }
  

  // Send Messages
  public async sendMessage(message:string) {
    return this.connection.invoke("SendMessage", message);
  }
  // Leave Room
  public async leaveChat() {
    return this.connection.stop();
  }
}
