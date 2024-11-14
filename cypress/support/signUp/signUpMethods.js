import SignUpVariables from "./signUpVariables"


export default class SignUpMethods extends SignUpVariables {
    openSignUp() {
        cy.contains('[data-testid="header-sign-up-button"]', this.buttons.register, {timeout: 10000}).as('headerSignUp')
        cy.get('@headerSignUp', {timeout: 10000}).click()
    }
    clickSignUpInPopUp(actionButton) {
        cy.contains('[role="dialog"]', actionButton, {timeout: 10000} ).as('popUptSignUp')
        cy.get('@popUptSignUp', {timeout: 10000}).click()
    }

    typeUserEmail(email) {
        cy.get('#username').type(email)
    }

    submit(buttonTitle) {
        cy.contains('[type="submit"]', buttonTitle).click()
    }

    isCaptchaShown() {
        const captchaText = "Let's make sure you're human"
        cy.get('.page-header').should('contain.text', captchaText)
    }

    typeUserPassword(password) {
        cy.get('#new_password').type(password)
    }

    confirmUserPassword(password) {
        cy.get('#confirmed_password').type(password)
    }

    isSpamDetected() {
        const errorText = "Too many attempts – try again later."
        cy.get('.error-block').should('contain.text', errorText)
    }

    isPopUpExist(text) {
        cy.contains('[role="dialog"]', text, {timeout: 10000}).should('be.visible')
    }

    isExistEmailHint(email) {
        const hint = 'Enter your Booking.com password for ' + email
        cy.get('.page-header').should('contain.text', hint)
    }

    isInvalidEmailError(errorText) {
        const errorColor = 'rgb(212, 17, 30)'
        cy.get('#username-note').should('contain.text', errorText).and('have.css', 'color', errorColor)
        cy.get('#username').parent().find('svg').should('exist')
    }
}