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
  email = '';
  message = '';

  alerts = [
    {
      inputId: 'name',
      inputValue: this.name.trim(),
      alertText: 'Your name is required',
      disallowedCharacters: /[$"'`´\s\\]/

    },
    {
      inputId: 'email',
      inputValue: this.email.trim(),
      alertText: 'Your email is required'
    },
    {
      inputId: 'message',
      inputValue: this.message.trim(),
      alertText: 'Your message is empty'
    }
  ];


  validateInput(inputId: string) {

    this.alerts.forEach(alert => {
      
      if (alert.inputId !== inputId) return;
      
      const alertId = `${inputId}-alert-text`;

      // if (alert.regex.test(alert.inputValue)) {

      //   const alertElement = document.getElementById(alertId);

      //   if (!alertElement) return;
        
      //   alertElement.innerHTML = alert.alertText;
      // }


    });

  }

}
