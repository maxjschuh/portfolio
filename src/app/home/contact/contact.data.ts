import { Input } from '../../interfaces/input.interface';
import { Checkbox } from '../../interfaces/checkbox.interface';
import { userFeedback } from '../../interfaces/user-feedback.interface';


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
        disallowedCharacters: /[A-Za-z0-9@_.-]/,
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


export let userFeedbacks: userFeedback[] = [
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
        feedbackText: () => 'Contains disallowed characters!'
    },
    {
        feedbackType: 'empty',
        borderStyle: 'border-color: #E61C40',
        checkmarkIconStyle: '',
        alertIconStyle: 'display: flex',
        feedbackText: (inputId) => `Your ${inputId} is required!`
    },
    {
        feedbackType: 'invalid-email',
        borderStyle: 'border-color: #E61C40',
        checkmarkIconStyle: '',
        alertIconStyle: 'display: flex',
        feedbackText: () => 'Please enter a valid email!'
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
        feedbackText: (checkboxId) => `Please accept the ${checkboxId}.`
    }
];