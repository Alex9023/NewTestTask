import SignUpMethods from '../../support/signUp/signUpMethods'

const Fakerator = require('fakerator')
const fakerator = Fakerator()

describe('Sign Up', () => {
    const signUp = new SignUpMethods()

    beforeEach(() => {
        cy.visit('/')
        cy.document().then((doc) => {
            const element = doc.querySelector(`[aria-label^="${signUp.popUps.firstVisit.text}"]`);
                if(element) {
                    signUp.clickSignUpInPopUp(signUp.popUps.firstVisit.button)
                    cy.checkUrl(signUp.pageUrl.signIn)
                } else {
                    signUp.openSignUp()
                    cy.checkUrl(signUp.pageUrl.signIn)
                }
        })
        cy.intercept({
            url: `${Cypress.env('prod_api')}${signUp.api.submitEmail}`,
            method: 'POST'
        }).as('submitEmail')

        cy.intercept({
            url: `${Cypress.env('prod_api')}${signUp.api.submitPassword}`,
            method: 'POST'
        }).as('register')

    })
    it('Sign Up with valid data', () => {
        const email = fakerator.random.string(8) + '@gmail.com'
        signUp.typeUserEmail(email)
        signUp.submit(signUp.buttons.submitEmail)
        cy.wait('@submitEmail').then((res) => {
            if(res.response.statusCode !== 200 ) {
                signUp.isCaptchaShown()
            } else {
                cy.checkUrl(signUp.pageUrl.passwordCreation)
                signUp.typeUserPassword(signUp.defaultValidPassword)
                signUp.confirmUserPassword(signUp.defaultValidPassword)
                signUp.submit(signUp.buttons.submitPassword)
                cy.wait('@register').then((res) => {       
                    if(!res.response.body.error) {
                        cy.checkUrl(signUp.pageUrl.successRegister)
                        signUp.isPopUpExist(signUp.popUps.successRegister.text)
                    } else {
                        const registerError = res.response.body.error[0].errorDetails
                        expect(registerError).is.equal('Request throttled')
                        signUp.isSpamDetected()
                    }
                })
            }
        })
    });

    it('Sign Up with already used email', () => {
        signUp.typeUserEmail(signUp.existUser.email)
        signUp.submit(signUp.buttons.submitEmail)
        cy.wait('@submitEmail').then((res) => {
            if(res.response.statusCode !== 200 ) {
                signUp.isCaptchaShown()
            } else if (res.response.body.identifier == 'STEP_SIGN_IN__PASSWORD') {
                signUp.isExistEmailHint(signUp.existUser.email)
            }
        })
    });

    it('Sign Up with invalid email', () => {
        signUp.typeUserEmail(signUp.invalidEmail)
        signUp.submit(signUp.buttons.submitEmail)
        signUp.isInvalidEmailError(signUp.emailErrors.default)
    });
})