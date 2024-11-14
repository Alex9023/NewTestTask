export default class SignUpVariables {
    defaultValidPassword = 'Q1@#e3r4R5'
    invalidEmail = 'magic123gmail.com'
    existUser = {
        email: 'green15@gmail.com',
        password: 'Q1@#e3r4R&'
    }
    pageUrl = {
        signIn: 'sign-in',
        passwordCreation: 'register/password',
        successRegister: '?auth_success=1'
    }
    api = {
        submitEmail: 'identity/authenticate/v1.0/enter/email/submit**',
        submitPassword: '/identity/authenticate/v1.0/register/password/submit**'
    }
    buttons = {
        register: 'Register',
        submitEmail: 'Continue with email',
        submitPassword: 'Create account'
    }
    emailErrors = {
        default: 'Make sure the email address you entered is correct.'
    }
    popUps = {
        firstVisit: {
            text: 'Windows Offering',
            button: 'Sign in or register'
        },
        successRegister: {
            text: 'Welcome to Genius'
        }
    }
    

}