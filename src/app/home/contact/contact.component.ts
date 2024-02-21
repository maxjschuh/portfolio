import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AppComponent } from '../../app.component';
import { Input } from '../../interfaces/input.interface';
import { Checkbox } from '../../interfaces/checkbox.interface';
import { inputs, checkboxes, userFeedbacks } from "./contact.data"

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, AppComponent, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  inputs = inputs;
  checkboxes = checkboxes;
  userFeedbacks = userFeedbacks;
  submitButtonText = 'Send message :)';
  submitButtonStyle = 'background: rgba(182, 182, 182, 1)';
  currentlySendingMail = false;


  handleInput(input: Input) {

    this.validateAllInputs(false);
    this.setUserFeedbackForInput(input);

    let submitButtonReady = true;

    this.inputs.forEach(input => {

      if (input.currentFeedback !== 'valid') submitButtonReady = false;

    });

    this.colorSubmitButton(submitButtonReady);
  }


  colorSubmitButton(submitButtonReady: boolean) {

    if (submitButtonReady) this.submitButtonStyle = '';

    else this.submitButtonStyle = 'background: rgba(182, 182, 182, 1)';
  }


  validateAllCheckboxes() {

    this.checkboxes.forEach(checkbox => {

      this.validateCheckbox(checkbox);
    });
  }


  validateCheckbox(checkbox: Checkbox) {

    if (checkbox.checkboxAccepted) {

      checkbox.currentFeedback = 'checkbox-unaccepted';

    } else checkbox.currentFeedback = 'default';
  }

  validateAllInputs(formSubmission: boolean) {

    this.inputs.forEach(input => {

      this.validateInput(input, formSubmission);
    });
  }


  /**
   * Validates the value of a input field that is passed as parameter and sets the feedback accordingly.
   * @param input object that contains information about the input field that should be validated
   * @param formSubmission true when the user submissed the form, false for validation on input
   */
  validateInput(input: Input, formSubmission: boolean): void {

    const trimmedInput = input.value.trim();

    if (!trimmedInput) {

      input.currentFeedback = 'default';

    } else if (!trimmedInput && formSubmission) {

      input.currentFeedback = 'empty';

    } else if (input.disallowedCharacters.test(trimmedInput)) {

      input.currentFeedback = 'invalid';

    } else if (input.id === 'email') {

      this.testForEmailPattern(input, !formSubmission);

    } else input.currentFeedback = 'valid';
  }


  /**
   * Tests if an input, that is passed as parameter, has a valid email as pattern. Sets the feedback accordingly.
   * @param input object that contains information about the input field that should be validated
   * @param formSubmission true when the user submissed the form, false for validation on input
   * @returns if the input field is empty
   */
  testForEmailPattern(input: Input, focus: boolean): void {

    const expectedPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const trimmedInput = input.value.trim();

    if (focus) {
      input.currentFeedback = 'default';
    } else if (expectedPattern.test(trimmedInput)) {
      input.currentFeedback = 'valid';

    } else {
      input.currentFeedback = 'invalid-email';
    }
  }


  /**
   * Sets the feedback for an input field in the style of the passed parameters.
   * @param input object that contains information about the input field for which the feedback should be set
   * @param feedbackType one of three feedback types: 'default', 'invalid', 'valid'
   */
  setUserFeedbackForInput(input: Input): void {

    this.userFeedbacks.forEach(userFeedback => {

      if (userFeedback.feedbackType !== input.currentFeedback) return;

      input.alertText = userFeedback.feedbackText(input.id);
      input.style = userFeedback.borderStyle;
      input.checkmarkIconStyle = userFeedback.checkmarkIconStyle;
      input.alertIconStyle = userFeedback.alertIconStyle;
    });
  }


  formReadyToSubmit() {

    this.inputs.forEach(input => {

      if (input.currentFeedback !== 'valid') return;
    });

    this.checkboxes.forEach(checkbox => {

      if (checkbox.currentFeedback !== 'valid') return;
    });

    return true;
  }


  /**
   * Is called on submitting the contact form. Validates the input fields, waits for the email to be sent and afterwards resets the contact form.
   */
  async submitContactForm() {

    // this.validateAllInputs(true);
    // this.validateAllCheckboxes();

    // if (!this.formReadyToSubmit()) return;


    await this.handleFetchRequest();

    this.resetForm();
  }

  async handleFetchRequest() {

    this.submitButtonText = 'Sending mail';
    this.currentlySendingMail = true;
    const startTime = Date.now();

    // let response = await this.sendEmail();

    // if (!response.ok) {

    //   this.currentlySendingMail = false;

    //   this.submitButtonText = 'Server error! Please try again later!';

    //   setTimeout(() => {
    //     this.submitButtonText = 'Send message :)';
    //   }, 5000);

    //   return;
    // }

    const duration = Date.now() - startTime;

    // if (duration < 2000) 
    
    setTimeout(() => { 
      console.log('asgdjagsd')
      this.currentlySendingMail = false;
      this.submitButtonText = '&#10004; Your message has been sent';
    }, 2000);




    setTimeout(() => {
      this.submitButtonText = 'Send message :)';
    }, 7000);

  }



  /**
   * Empties the input fields of the contact form and hides the feedback alerts.
   */
  resetForm(): void {

    this.inputs.forEach(input => {

      input.value = '';
      input.currentFeedback = 'default';
      this.setUserFeedbackForInput(input);
    });

    // this.privacyPolicyAccepted = false;
    // this.toggleVisibilityOfElements(['checkbox-selected'], false);
    // this.toggleVisibilityOfElements(['checkbox-default'], true);
  }


  /**
   * Event handler for when the mouse hovers over the privacy policy checkbox.
   */
  handleCheckboxMouseover(): void {

    // this.toggleVisibilityOfElements(['checkbox-selected', 'checkbox-default'], false);

    // if (this.privacyPolicyAccepted) {

    //   this.toggleVisibilityOfElements(['checkbox-selected-hover'], true);

    // } else this.toggleVisibilityOfElements(['checkbox-hover'], true);
  }


  /**
   * Event handler for when the mouse leaves the privacy policy checkbox.
   */
  handleCheckboxMouseout(): void {

    // this.toggleVisibilityOfElements(['checkbox-hover', 'checkbox-selected-hover'], false);

    // if (this.privacyPolicyAccepted) {

    //   this.toggleVisibilityOfElements(['checkbox-selected'], true);
    // } else {

    //   this.toggleVisibilityOfElements(['checkbox-default'], true);
    // }
  }


  /**
   * Toggles the checkmark in the privacy policy checkbox.
   */
  togglePrivacyPolicyAcceptance(): void {

    // if (this.privacyPolicyAccepted) {

    //   this.toggleVisibilityOfElements(['checkbox-selected-hover'], false);
    //   this.toggleVisibilityOfElements(['checkbox-hover'], true);

    // } else {

    //   this.toggleVisibilityOfElements(['checkbox-hover'], false);
    //   this.toggleVisibilityOfElements(['checkbox-selected-hover'], true);
    //   this.checkboxAlertText = '';
    // }

    // this.privacyPolicyAccepted = !this.privacyPolicyAccepted;
  }


  /**
   * Toggles the visibilty of the elements with the passed ids.
   * @param ids array of element ids
   * @param showElements true for showing the elements, false for hiding them
   */
  toggleVisibilityOfElements(ids: string[], showElements: boolean): void {

    ids.forEach(id => {

      document.getElementById(id)?.classList.toggle('d-flex-important', showElements);
    });
  }


  /**
   * Extracts the values from the contact form input fields and calls a php script for sending a mail with the collected information.
   */
  async sendEmail() {

    const data = {
      name: this.inputs[0].value,
      message: this.generateContactMessage(
        this.inputs[0].value,
        this.inputs[1].value,
        this.inputs[2].value)
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    };

    return await fetch('./../../send_mail.php', options);
  }


  /**
   * Generates an html template for an email with the passed parameters.
   * @param name of the person that sends the contact request
   * @param email of the person that sends the contact request
   * @param message message of the contact request
   * @returns html template for email to site admin
   */
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
              <h1>New message from
                <a href="mailto:${email}">${name}</a>
              </h1>
              <p>${message}</p>
              </div>
          </div>
      </body>
      </html>
  `;
  }
}
