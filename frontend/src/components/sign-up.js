import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config";

export class Signup {
  constructor() {
    this.fullNameElement = document.getElementById('fullName')
    this.emailElement = document.getElementById('email')
    this.passwordElement = document.getElementById('password')
    this.repeatPasswordElement = document.getElementById('checkPassword')
    this.processElement = document.getElementById("signUp")
    this.popupElement = document.getElementById('popup')
    this.popupContent = document.getElementById('popup-content')
    this.popupTextElement = document.getElementById('popup-text')
    this.popupButtonElement = document.getElementById('popup-button')

    this.message = {
      success: 'You have successfully registered and will soon be redirected to the login page',
      error: 'Something went wrong... Try again.',
    }


    this.processElement.addEventListener('click', this.processForm.bind(this))

  }

  // Vfrcbv123q1@

  validateSignUp() {
    let isValid = true


    if (this.fullNameElement.value && this.fullNameElement.value.match(/^[a-zA-Z\s]+$/)) {
      this.fullNameElement.classList.remove('error-input')
    } else {
      this.fullNameElement.classList.add('error-input')
      isValid = false;
    }

    // && this.passwordElement.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

    if (this.passwordElement.value) {
      this.passwordElement.classList.remove('error-input')
    } else {
      this.passwordElement.classList.add('error-input')
      isValid = false;
    }

    if (this.repeatPasswordElement.value && this.repeatPasswordElement.value === this.passwordElement.value) {
      this.repeatPasswordElement.classList.remove('error-input')
    } else {
      this.repeatPasswordElement.classList.add('error-input')
      isValid = false;
    }

    if (this.emailElement.value && this.emailElement.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
      this.emailElement.classList.remove('error-input')
    } else {
      this.emailElement.classList.add('error-input')
      isValid = false;
    }

    return isValid
  }

  async processForm() {
    if (this.validateSignUp()) {

      const fullName = this.fullNameElement.value
      const email = this.emailElement.value
      const password = this.passwordElement.value
      const checkPassword = this.repeatPasswordElement.value

      let first_name = fullName.split(' ')[0]
      let last_name = fullName.substring(first_name.length).trim()

      if (last_name === '') last_name = first_name

      try {
        const result = await CustomHttp.request(config.host + "/signup", "POST", {
            name: first_name,
            lastName: last_name,
            email: email,
            password: password,
            passwordRepeat: checkPassword
          }
        )



        if (result) {

          this.popupElement.classList.remove('hide')
          this.popupContent.style.cssText = `
                        height: 13rem;
                    `;
          this.popupTextElement.textContent = this.message.success
          this.popupTextElement.style.color = 'green'
          this.popupButtonElement.style.display = 'none'

          setTimeout(() => {
            this.popupElement.classList.add('hide')
            location.href = '#/login'
          }, 31000)

        }
      } catch (error) {

      }
    } else {
      console.log('error')
    }
  }
}
