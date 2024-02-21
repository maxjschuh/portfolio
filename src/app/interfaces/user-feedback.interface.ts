export interface userFeedback {
    feedbackType: 'default' | 'invalid' | 'empty' | 'invalid-email' | 'checkbox-unaccepted' | 'valid',
    borderStyle: string | undefined,
    checkmarkIconStyle: string | undefined,
    alertIconStyle: string | undefined,
    feedbackText: ((param: string) => string)
}