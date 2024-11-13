import SignUpVariables from "./signUp.variables"

export default class SignUpMethods extends SignUpVariables {
    openSignUp() {
        cy.get('[data-testid="header-sign-up-button"]', {timeout: 15000}).should('contain.text', 'Register').as('headerSignUp')
        cy.get('@headerSignUp').click()
    }
    clickSignUpInStartPopUp() {
        cy.get('[role="dialog"]').contains('Sign in or register').as('popUptSignUp')
        cy.get('@popUptSignUp').click()
    }
    isSignInPage() {
        cy.url().should('include', 'https://account.booking.com/sign-in')
    }
    typeUserEmail(email) {
        cy.get('#username').type(email)
    }

    sendUserEmail() {
        cy.get('[type="submit"]').should('have.text', 'Continue with email').click()
    }

    isCaptchaShown() {
        cy.get('.page-header').should('contain.text', "Let's make sure you're human")
    }

    isPasswordCreationPage() {
        cy.url().should('include', 'https://account.booking.com/register/password')
    }

    typeUserPassword(password) {
        cy.get('#new_password').type(password)
    }

    confirmUserPassword(password) {
        cy.get('#confirmed_password').type(password)
    }

    createAccount() {
        cy.get('[type="submit"]').should('have.text', 'Create account').click()
    }

    isSpamDetected() {
        cy.get('.error-block').should('contain.text', "Too many attempts – try again later.")
    }
    
    isSuccessAccountCreation() {
        cy.url().should('include', 'https://www.booking.com/?auth_success=1')
    }

    isShownWelcomePopUp() {
        cy.get('[role="dialog"]').should('contain.text', 'Welcome to Genius')
    }
    isExistEmailHint(email) {
        cy.get('.page-header').should('contain.text', `Enter your Booking.com password for ${email}`)
    }

    isInvalidEmailError() {
        cy.get('#username-note').should('contain.text', 'Make sure the email address you entered is correct.').and('have.css', 'color', 'rgb(212, 17, 30)')
        cy.get('#username').parent().find('svg').should('exist')
    }
}