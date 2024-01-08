import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from '../../app.component';
import { error } from 'node:console';

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
      alertText: 'Your email is required',
      disallowedCharacters: /[$"'`´\s\\]/
    },
    {
      inputId: 'message',
      inputValue: this.message.trim(),
      alertText: 'Your message is empty',
      disallowedCharacters: /[$"'`´\s\\]/
    }
  ];


  validateInput(inputId: string) {

    for (let i = 0; i < this.alerts.length; i++) {
      const alert = this.alerts[i];

      if (alert.inputId !== inputId) return;

      const alertId = `${inputId}-alert-text`;
      const alertElement = document.getElementById(alertId);

      if (!alertElement) throw new Error;

      
      if (alert.disallowedCharacters.test(alert.inputValue)) {
        
        alertElement.innerHTML = alert.alertText;

      } else {
        alertElement.innerHTML = '';
      }

    }
  }

  submitContactForm() {

    console.log('here')

  }

  handleCheckboxMouseover() {

    this.toggleVisibilityOfElements(['checkbox-selected', 'checkbox-default'], false);

    if (this.privacyPolicyAccepted) {

      this.toggleVisibilityOfElements(['checkbox-selected-hover'], true);
    } else {

      this.toggleVisibilityOfElements(['checkbox-hover'], true);
    }

  }


  handleCheckboxMouseout() {

    this.toggleVisibilityOfElements(['checkbox-hover', 'checkbox-selected-hover'], false);

    if (this.privacyPolicyAccepted) {

      this.toggleVisibilityOfElements(['checkbox-selected'], true);
    } else {

      this.toggleVisibilityOfElements(['checkbox-default'], true);
    }
  }


  togglePrivacyPolicyAcceptance() {

    if (this.privacyPolicyAccepted) {

      this.toggleVisibilityOfElements(['checkbox-selected-hover'], false);
      this.toggleVisibilityOfElements(['checkbox-hover'], true);
    } else {


      this.toggleVisibilityOfElements(['checkbox-hover'], false);
      this.toggleVisibilityOfElements(['checkbox-selected-hover'], true);
    }

    this.privacyPolicyAccepted = !this.privacyPolicyAccepted;
  }

  toggleVisibilityOfElements(ids: string[], showElements: boolean) {

    ids.forEach(id => {

      document.getElementById(id)?.classList.toggle('d-flex-important', showElements);
    })
  }

  async sendEmail() {

    const url = "./../../send_mail.php";
    const data = {
      name: this.name,
      message: this.generateContactMessage(this.name, this.email, this.message)
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    };

    await fetch(url, options);
  }


  generateContactMessage(name: string, email: string, message: string): string {

    return /*html*/ `
          <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message from ${name}</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
          
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>New message from ${name}
                <a href="mailto:${email}"></a>
              </h1>
              <p>${message}</p>
              </div>
          </div>
      </body>
      </html>
  `;
  }
}
