import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Popup} from "./popup.js";
import {Auth} from "../services/auth.js"

export class Signup extends Popup {
  constructor() {
    super()
    const accessToken = localStorage.getItem(Auth.accessToken)
    if (accessToken) {
      location.href = "#/"
      return
    }

    this.fullNameElement = document.getElementById('fullName')
    this.emailElement = document.getElementById('email')
    this.passwordElement = document.getElementById('password')
    this.repeatPasswordElement = document.getElementById('checkPassword')
    this.processElement = document.getElementById("signUp")
    this.message = {
      success: 'You have successfully registered and will soon be redirected to the login page',
      error: 'Something went wrong... Try again.',
    }

    this.processElement.addEventListener('click', this.processSingUp.bind(this))
  }

  validateSignUp() {
    let isValid = true

    if (this.fullNameElement.value && this.fullNameElement.value.match(/^[a-zA-Z\s]+$/)) {
      this.fullNameElement.classList.remove('error-input')
    } else {
      this.fullNameElement.classList.add('error-input')
      isValid = false;
    }

    if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
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

  async processSingUp() {
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
          if (result.error) {
            this.popupElement.classList.remove('hide')
            this.popupContent.style.cssText = `
                        height: 10rem;
                    `;
            this.popupTextElement.textContent = result.message
            this.popupTextElement.style.color = 'red'
            this.popupButtonElement.style.display = 'none'

            setTimeout(() => {
              this.reset()
              this.hide()
              location.href = '#/signup'
            }, 3000)
          } else {
            this.popupElement.classList.remove('hide')
            this.popupContent.style.cssText = `
                        height: 13rem;
                    `;
            this.popupTextElement.textContent = this.message.success
            this.popupTextElement.style.color = 'green'
            this.popupButtonElement.style.display = 'none'

            setTimeout(() => {
              this.reset()
              this.hide()
              location.href = '#/login'
            }, 5000)
          }
        }
      } catch (error) {
        return error
      }
    } else {
      console.log('error')
    }
  }
}
