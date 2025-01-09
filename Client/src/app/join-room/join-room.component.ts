import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Navigation } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  imports: [FormsModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent{
  chatService = inject(ChatService);
  router = inject(Router);
  userRoomConnection = {
    user: '',
    room: '',
  };

  joinRoom() {
    console.log("user: ", this.userRoomConnection.user);
    console.log("room: ", this.userRoomConnection.room);
    sessionStorage.setItem("user", this.userRoomConnection.user);
    // this return a promise...
    this.chatService.joinRoom(this.userRoomConnection.user, this.userRoomConnection.room)
    .then( () => {
      console.log()
      this.router.navigateByUrl("chat");
    }).catch((err) => {
      console.log(err);
    })
  }
}
