import SignUpMethods from '../../support/signUp/signUpMethods';

const Fakerator = require('fakerator')
const fakerator = Fakerator()

describe('Sign Up', () => {
    const signUp = new SignUpMethods()

    beforeEach(() => {
        cy.visit('https://www.booking.com/')
        cy.document().then((doc) => {
            const element = doc.querySelector('[aria-label^="Window Offering"]');
            if (element) {
                signUp.clickSignUpInStartPopUp()
                signUp.isSignInPage()
            } else {
                signUp.openSignUp()
                signUp.isSignInPage()
            }
        })
        cy.intercept({
            url: 'https://account.booking.com/api/identity/authenticate/v1.0/enter/email/submit**',
            method: 'POST'
        }).as('submitEmail')
        cy.intercept({
            url: 'https://account.booking.com/api/identity/authenticate/v1.0/register/password/submit**',
            method: 'POST'
        }).as('register')

    })
    it('Sign Up with valid data', () => {
        const email = fakerator.random.string(8) + '@gmail.com'
        signUp.typeUserEmail(email)
        signUp.sendUserEmail()
        cy.wait('@submitEmail').then((res) => {
            if(res.response.statusCode !== 200 ) {
                signUp.isCaptchaShown()
            } else {
                signUp.isPasswordCreationPage()
                signUp.typeUserPassword(signUp.validUser.password)
                signUp.confirmUserPassword(signUp.validUser.password)
                signUp.createAccount()
                cy.wait('@register').then((res) => {
                    
                    if(!res.response.body.error) {
                        signUp.isSuccessAccountCreation()
                        signUp.isShownWelcomePopUp()
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
        signUp.sendUserEmail()
        cy.wait('@submitEmail').then((res) => {
            if(res.response.statusCode !== 200 ) {
                signUp.isCaptchaShown()
            } else if (res.response.body.identifier == 'STEP_SIGN_IN__PASSWORD') {
                signUp.isExistEmailHint(signUp.existUser.email)
            }
        })
    });

    it('Sign Up with invalid email', () => {
        signUp.typeUserEmail(signUp.invalidUser.email)
        signUp.sendUserEmail()
        signUp.isInvalidEmailError()
    });
})