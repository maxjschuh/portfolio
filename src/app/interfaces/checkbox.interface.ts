export interface Checkbox {
    id: string,
    alertText: string,
    checkboxAccepted: boolean,
    currentFeedback: 'default' | 'checkbox-unaccepted' | 'valid'
  }