import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, AppComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  name = '';
  email = '';
  message = '';
  privacyPolicyAccepted = false;

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

  submitContactForm() {

    console.log('here')

  }

  togglePrivacyPolicyAcceptance() {

    this.toggleVisibilityOfElements(['checkbox-default'], this.privacyPolicyAccepted);
    this.toggleVisibilityOfElements(['checkbox-selected'], !this.privacyPolicyAccepted);
    
    this.privacyPolicyAccepted = !this.privacyPolicyAccepted;
  }

  toggleVisibilityOfElements(ids: string[], showElements: boolean) {

    ids.forEach(id => {

      document.getElementById(id)?.classList.toggle('d-flex-important', showElements);
    })
  }
}
