import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Input } from '../../interfaces/input.interface';
import { Checkbox } from '../../interfaces/checkbox.interface';
import { EMAIL_PATTERN, inputs, checkboxes, initializeUserFeedbacks, userFeedbacks } from "./contact.data"
import { sendEmail } from './contact.send-mail';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { userFeedback } from '../../interfaces/user-feedback.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

  inputs = inputs;
  checkboxes = checkboxes;
  userFeedbacks: userFeedback[];
  submitButtonText = {
    translationKey: 'contact.form.submit-button.default',
    text: ''
  };
  submitButtonStyle = 'background: rgba(182, 182, 182, 1)';
  submitButtonDisabled = false;
  currentlySendingMail = false;

  constructor(public translate: TranslateService) {
    initializeUserFeedbacks(this.translate);
    this.userFeedbacks = userFeedbacks;

    translate.onLangChange.subscribe(() => {
      this.updateSubmitButtonText(null);
    });

  }

  updateSubmitButtonText(translationKey: string | null) {

    if (translationKey) this.submitButtonText.translationKey = translationKey;

    this.submitButtonText.text = this.translate.instant(this.submitButtonText.translationKey);
  }


  /**
   * Is called when the user makes an input in one of the input fields.
   * @param input object with information about the input field where the input happened
   * @param formSubmission always false except for email input on focusout
   */
  handleInput(input: Input, formSubmission: boolean): void {

    this.validateInput(input, formSubmission);
    this.setUserFeedbackForInput(input);

    this.colorSubmitButton();
  }


  /**
  * Validates the value of a input field that is passed as parameter and sets the feedback variable accordingly.
  * @param input object that contains information about the input field that should be validated
  * @param formSubmission true when the user submissed the form, false for validation on input
  */
  validateInput(input: Input, formSubmission: boolean): void {

    const trimmedInput = input.value.trim();

    if (!trimmedInput && formSubmission) {

      input.currentFeedback = 'empty';

    } else if (!trimmedInput) {

      input.currentFeedback = 'default';

    } else if (input.disallowedCharacters.test(trimmedInput)) {

      input.currentFeedback = 'invalid';

    } else if (input.id === 'email') {

      this.testForEmailPattern(input, formSubmission);

    } else input.currentFeedback = 'valid';
  }


  /**
  * Adjusts borders, icons and feedback text accordingly to the current feedback property of a specific input that is passed as parameter.
  * @param input object that contains information about the input field for which the feedback should be set
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


  /**
   * In case the form is ready to submit, the submit button background is colored in blue, otherwise in grey.
   */
  colorSubmitButton(): void {

    if (this.formReadyToSubmit()) this.submitButtonStyle = '';

    else this.submitButtonStyle = 'background: rgba(182, 182, 182, 1)';
  }


  /**
   * Tests if an input, that is passed as parameter, has a valid email as pattern. Sets the feedback accordingly.
   * @param input object that contains information about the input field that should be validated
   * @param formSubmission true when the user submissed the form or focusout event occured, false for validation on input
   */
  testForEmailPattern(input: Input, formSubmission: boolean): void {

    const trimmedInput = input.value.trim();

    if (EMAIL_PATTERN.test(trimmedInput)) {

      input.currentFeedback = 'valid';

    } else if (!formSubmission) {

      input.currentFeedback = 'default';

    } else {

      input.currentFeedback = 'invalid-email';
    }
  }


  /**
   * Tests if the contact form is ready to be submitted, i.e. all input fields and checkboxes are valid.
   * @returns true if the contact form may be submitted, false if not
   */
  formReadyToSubmit(): boolean {

    const requiredFields = [...inputs, ...checkboxes];
    let formReady = true;

    requiredFields.forEach(requiredField => {

      if (requiredField.currentFeedback !== 'valid') formReady = false;
    });

    return formReady;
  }


  /**
  * Is called on submitting the contact form. Validates the input fields, waits for the email to be sent and afterwards resets the contact form.
  */
  async submitContactForm(): Promise<void> {

    this.validateAllInputs(true);
    this.validateAllCheckboxes(true);

    if (!this.formReadyToSubmit()) {

      this.setAllUserFeedbacks();
      return;
    }

    this.submitButtonDisabled = true;
    this.updateSubmitButtonText('contact.form.submit-button.working');
    this.currentlySendingMail = true;
    await this.handleFetchRequest();

    this.resetForm();
  }


  /**
   * Iterates through the checkboxes array and calls the validateCheckbox() function for every item.
   * @param formSubmission true if the checkbox should be validated for a form submission, i.e. an unaccepted checkbox leads to the "checkbox-unaccepted" feedback instead of the "default" feedback
   */
  validateAllCheckboxes(formSubmission: boolean): void {

    this.checkboxes.forEach(checkbox => {

      this.validateCheckbox(checkbox, formSubmission);
    });
  }


  /**
   * Tests if a checkbox is accepted and sets the feedback property accordingly.
   * @param checkbox object that contains information about the checkbox that should be validated
   * @param formSubmission true if the checkbox should be validated for a form submission, i.e. an unaccepted checkbox leads to the "checkbox-unaccepted" feedback instead of the "default" feedback
   */
  validateCheckbox(checkbox: Checkbox, formSubmission: boolean): void {

    if (!checkbox.checkboxAccepted && formSubmission) {

      checkbox.currentFeedback = 'checkbox-unaccepted';

    } else if (!checkbox.checkboxAccepted) {

      checkbox.currentFeedback = 'default';

    } else {

      checkbox.currentFeedback = 'valid';
    }
  }


  /**
   * Iterates through the inputs array and calls the validateInput() function for every item.
   * @param formSubmission true if the input should be validated for a form submission, i.e. an empty input leads to the "empty" feedback instead of the "default" feedback
   */
  validateAllInputs(formSubmission: boolean): void {

    this.inputs.forEach(input => {

      this.validateInput(input, formSubmission);
    });
  }


  /**
   * Iterates through the inputs and the checkboxes arrays and calls the corresponding function that updates the feedback styling for every item.
   */
  setAllUserFeedbacks(): void {

    inputs.forEach(input => {
      this.setUserFeedbackForInput(input);
    });

    checkboxes.forEach(checkbox => {
      this.setUserFeedbackForCheckbox(checkbox);
    });
  }


  /**
   * Adjusts the feedback text accordingly to the current feedback property of a specific checkbox that is passed as parameter.
   * @param checkbox object that contains information about the checkbox for which the feedback should be set
   */
  setUserFeedbackForCheckbox(checkbox: Checkbox): void {

    this.userFeedbacks.forEach(userFeedback => {

      if (userFeedback.feedbackType !== checkbox.currentFeedback) return;

      checkbox.alertText = userFeedback.feedbackText(checkbox.id);
    });
  }


  /**
   * Handles the send mail request from the contact form. Gives feedback about success or failure via the text on the submit button.
   */
  async handleFetchRequest(): Promise<void> {

    const startTime = Date.now();
    const response = await sendEmail(this.inputs);

    const requestDuration = Date.now() - startTime;

    if (requestDuration < 1500) await this.sleep(1500 - requestDuration);

    if (!response.ok) {

      this.updateSubmitButtonText('contact.form.submit-button.error');

    } else {

      this.updateSubmitButtonText('contact.form.submit-button.success');

    }

    this.currentlySendingMail = false;
    await this.sleep(5000);
    this.updateSubmitButtonText('contact.form.submit-button.default');
  }


  /**
  * Lets the script execution pause for a desired time.
  * @param ms time in milliseconds for which the pause should last
  * @returns Promise
  */
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
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

    this.checkboxes[0].checkboxAccepted = false;
    this.toggleVisibilityOfElements(['checkbox-selected'], false);
    this.toggleVisibilityOfElements(['checkbox-default'], true);

    this.colorSubmitButton();
    this.submitButtonDisabled = false;
  }


  /**
   * Event handler for when the mouse hovers over the privacy policy checkbox.
   */
  handleCheckboxMouseover(): void {

    this.toggleVisibilityOfElements(['checkbox-selected', 'checkbox-default'], false);

    if (this.checkboxes[0].checkboxAccepted) {

      this.toggleVisibilityOfElements(['checkbox-selected-hover'], true);

    } else this.toggleVisibilityOfElements(['checkbox-hover'], true);
  }


  /**
   * Event handler for when the mouse leaves the privacy policy checkbox.
   */
  handleCheckboxMouseout(): void {

    this.toggleVisibilityOfElements(['checkbox-hover', 'checkbox-selected-hover'], false);

    if (this.checkboxes[0].checkboxAccepted) {

      this.toggleVisibilityOfElements(['checkbox-selected'], true);
    } else {

      this.toggleVisibilityOfElements(['checkbox-default'], true);
    }
  }


  /**
   * Toggles the checkmark in the privacy policy checkbox.
   */
  togglePrivacyPolicyAcceptance(): void {

    let checkbox = checkboxes[0];

    if (checkbox.checkboxAccepted) {

      this.toggleVisibilityOfElements(['checkbox-selected-hover'], false);
      this.toggleVisibilityOfElements(['checkbox-hover'], true);

    } else {

      this.toggleVisibilityOfElements(['checkbox-hover'], false);
      this.toggleVisibilityOfElements(['checkbox-selected-hover'], true);
    }

    checkbox.checkboxAccepted = !checkbox.checkboxAccepted;
    this.validateCheckbox(checkbox, false);
    this.setUserFeedbackForCheckbox(checkbox);
    this.colorSubmitButton();
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
}