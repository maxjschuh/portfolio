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
