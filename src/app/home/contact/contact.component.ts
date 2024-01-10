import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from '../../app.component';
import { Input } from '../../interfaces/input.interface';
import { CommonModule } from '@angular/common';
import { InputUserFeedback } from '../../interfaces/input-user-feedback.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, AppComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  privacyPolicyAccepted = false;
  formValid = false;
  checkboxAlertText = '';

  inputs: Input[] = [
    {
      inputId: 'name',
      style: '',
      value: '',
      alertText: '',
      alertIconStyle: '',
      checkmarkIconStyle: '',
      disallowedCharacters: /[$"'`´\s\\]/,
      valid: false
    },
    {
      inputId: 'email',
      style: '',
      value: '',
      alertText: '',
      alertIconStyle: '',
      checkmarkIconStyle: '',
      disallowedCharacters: /[$"'`´\s\\]/,
      valid: false
    },
    {
      inputId: 'message',
      style: '',
      value: '',
      alertText: '',
      checkmarkIconStyle: '',
      alertIconStyle: '',
      disallowedCharacters: /[$"'`´\s\\]/,
      valid: false
    }
  ];

  inputUserFeedbacks: InputUserFeedback[] = [
    {
      feedbackType: 'default',
      borderStyle: '',
      checkmarkIconStyle: '',
      alertIconStyle: '',
      inputValid: false
    },
    {
      feedbackType: 'invalid',
      borderStyle: 'border-color: #E61C40',
      checkmarkIconStyle: '',
      alertIconStyle: 'display: flex',
      inputValid: false
    },
    {
      feedbackType: 'valid',
      borderStyle: 'border-color: #70E61C',
      checkmarkIconStyle: 'display: flex',
      alertIconStyle: '',
      inputValid: true
    }
  ];


  validateInput(input: Input, formSubmission: boolean) {

    if (!formSubmission && !input.value) {

      this.setUserFeedbackForInput(input, '', 'default');

    } else if (!input.value) {

      const alertText = `Your ${input.inputId} is required!`;
      this.setUserFeedbackForInput(input, alertText, 'invalid');

    } else if (input.disallowedCharacters.test(input.value)) {

      const alertText = 'Contains disallowed characters!';
      this.setUserFeedbackForInput(input, alertText, 'invalid');

    } else this.setUserFeedbackForInput(input, '', 'valid');
  }


  setUserFeedbackForInput(input: Input, alertText: string, feedbackType: string) {

    this.inputUserFeedbacks.forEach(userFeedback => {

      if (userFeedback.feedbackType !== feedbackType) return;

      input.alertText = alertText;
      input.style = userFeedback.borderStyle;
      input.checkmarkIconStyle = userFeedback.checkmarkIconStyle;
      input.alertIconStyle = userFeedback.alertIconStyle;
      input.valid = userFeedback.inputValid;

      if (!userFeedback.inputValid) this.formValid = false;

    });
  }


  async submitContactForm() {

    this.formValid = this.privacyPolicyAccepted;
    this.inputs.forEach(input => this.validateInput(input, true));

    if (!this.privacyPolicyAccepted) {
      this.checkboxAlertText = 'Please accept the privacy policy.';

    } else if (this.formValid) {

      await this.sendEmail();
      this.resetForm();
    }
  }


  resetForm() {

    this.inputs.forEach(input => {
      
      input.value = '';
      this.setUserFeedbackForInput(input, '', 'default');
    });

    this.privacyPolicyAccepted = false;
    this.toggleVisibilityOfElements(['checkbox-selected'], false);
    this.toggleVisibilityOfElements(['checkbox-default'], true);
  }


  handleCheckboxMouseover() {

    this.toggleVisibilityOfElements(['checkbox-selected', 'checkbox-default'], false);

    if (this.privacyPolicyAccepted) {

      this.toggleVisibilityOfElements(['checkbox-selected-hover'], true);

    } else this.toggleVisibilityOfElements(['checkbox-hover'], true);
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
      this.checkboxAlertText = '';
    }

    this.privacyPolicyAccepted = !this.privacyPolicyAccepted;
  }


  toggleVisibilityOfElements(ids: string[], showElements: boolean) {

    ids.forEach(id => {

      document.getElementById(id)?.classList.toggle('d-flex-important', showElements);
    });
  }


  async sendEmail() {

    const url = "./../../send_mail.php";

    const data = {
      name: this.inputs[0].value,
      message: this.generateContactMessage(
        this.inputs[0].value,
        this.inputs[1].value,
        this.inputs[2].value)
    };

    console.log(data);

    // const options = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: new URLSearchParams(data)
    // };

    // await fetch(url, options);
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
