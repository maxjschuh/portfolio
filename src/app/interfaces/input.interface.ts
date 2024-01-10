export interface Input {
    inputId: string,
    style: string,
    value: string,
    alertText: string,
    alertIconStyle: string,
    checkmarkIconStyle: string,
    disallowedCharacters: RegExp,
    valid: boolean
  }