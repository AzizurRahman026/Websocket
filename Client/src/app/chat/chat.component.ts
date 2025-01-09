import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  chatService = inject(ChatService);
  router = inject(Router);
  messages: any[] = [];
  newMessage:string = "";
  Users:string[] = [];
  loggedInUserName = sessionStorage.getItem("user");

  ngOnInit(): void {
    this.chatService.messages$.subscribe((res)=>{
      this.messages = res;
      console.log("chat messages: ", this.messages);
    });
    
    this.chatService.connectedUsers$.subscribe((res)=>{
      this.Users = res;
      console.log("Connected Users: ", this.Users);
    });
  }

  sendMessage() {
    console.log("new message: ", this.newMessage);
    this.chatService.sendMessage(this.newMessage)
    .then(()=>{
      this.newMessage = "";
    }).catch((err)=>{
      console.log("Not sent message because: ", err);
    })
  }

  leaveChat() {
    this.chatService.leaveChat()
    .then(()=>{
      this.router.navigateByUrl("welcome");
      localStorage.removeItem("user");
    }).catch((err)=>{
      console.log("Not leave chat. Error is: ", err);
    })
  }


  
}
