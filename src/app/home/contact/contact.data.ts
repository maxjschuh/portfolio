import { Input } from '../../interfaces/input.interface';
import { Checkbox } from '../../interfaces/checkbox.interface';
import { userFeedback } from '../../interfaces/user-feedback.interface';
import { TranslateService } from '@ngx-translate/core';


export const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


export let inputs: Input[] = [
    {
        id: 'name',
        style: '',
        value: '',
        alertText: '',
        alertIconStyle: '',
        checkmarkIconStyle: '',
        disallowedCharacters: /['"`´\\]/,
        currentFeedback: 'default'
    },
    {
        id: 'email',
        style: '',
        value: '',
        alertText: '',
        alertIconStyle: '',
        checkmarkIconStyle: '',
        disallowedCharacters: /[^A-Za-z0-9@_.-]/,
        currentFeedback: 'default'
    },
    {
        id: 'message',
        style: '',
        value: '',
        alertText: '',
        checkmarkIconStyle: '',
        alertIconStyle: '',
        disallowedCharacters: /['"`´\\]/,
        currentFeedback: 'default'
    }
];


export let checkboxes: Checkbox[] = [
    {
        id: 'privacy policy',
        alertText: '',
        checkboxAccepted: false,
        currentFeedback: 'default'
    }
];


export let userFeedbacks: userFeedback[];


export function initializeUserFeedbacks(translate: TranslateService): void {

    userFeedbacks = [
        {
            feedbackType: 'default',
            borderStyle: '',
            checkmarkIconStyle: '',
            alertIconStyle: '',
            feedbackText: () => ''
        },
        {
            feedbackType: 'invalid',
            borderStyle: 'border-color: #E61C40',
            checkmarkIconStyle: '',
            alertIconStyle: 'display: flex',
            feedbackText: () => translate.instant('contact.form.feedback-texts.invalid')
        },
        {
            feedbackType: 'empty',
            borderStyle: 'border-color: #E61C40',
            checkmarkIconStyle: '',
            alertIconStyle: 'display: flex',
            feedbackText: (inputId: string) => `Your ${inputId} is required!`
        },
        {
            feedbackType: 'invalid-email',
            borderStyle: 'border-color: #E61C40',
            checkmarkIconStyle: '',
            alertIconStyle: 'display: flex',
            feedbackText: () => translate.instant('contact.form.feedback-texts.invalid-email')
        },
        {
            feedbackType: 'valid',
            borderStyle: 'border-color: #70E61C',
            checkmarkIconStyle: 'display: flex',
            alertIconStyle: '',
            feedbackText: () => ''
        },
        {
            feedbackType: 'checkbox-unaccepted',
            borderStyle: undefined,
            checkmarkIconStyle: undefined,
            alertIconStyle: undefined,
            feedbackText: (checkboxId: string) => translate.instant('contact.form.feedback-texts.checkbox-unaccepted', {
                checkboxId: checkboxId
            })
        }
    ];
}