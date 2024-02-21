export interface Input {
    id: string,
    style: string | undefined,
    value: string,
    alertText: string,
    alertIconStyle: string | undefined,
    checkmarkIconStyle: string | undefined,
    disallowedCharacters: RegExp,
    currentFeedback: 'default' | 'invalid' | 'empty' | 'invalid-email' | 'valid'
  }