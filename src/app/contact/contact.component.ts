import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  name = '';

  alertTexts = [
    {
      input: 'name',
      alertText: 'Your name is required'
    },
    {
      input: 'email',
      alertText: 'Your email is required'
    },
    {
      input: 'message',
      alertText: 'Your message is empty'
    }
  ];


  logInput() {
    console.log(this.name);

  }

}
