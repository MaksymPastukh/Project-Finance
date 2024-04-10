import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config";

export class Signup {
  constructor() {
    this.email = null
    this.fullNameElement = document.getElementById('fullName')
    this.emailElement = document.getElementById('email')
    this.passwordElement = document.getElementById('password')
    this.repeatPasswordElement = document.getElementById('checkPassword')

    this.processElement = document.getElementById("signup")
    this.processElement.addEventListener('click', this.processForm.bind(this))

  }

  // Vfrcbv123q1@

  validateForm() {
    let isValid = true

    if (this.fullNameElement.value && this.fullNameElement.value.match(/^[a-zA-Z\s]+$/)) {
      this.fullNameElement.classList.remove('error-input')
    } else {
      this.fullNameElement.classList.add('error-input')
      isValid = false;
    }

    if (this.emailElement.value && this.emailElement.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
      this.emailElement.classList.remove('error-input')
    } else {
      this.emailElement.classList.add('error-input')
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

    return isValid
  }

  async processForm() {
    if (this.validateForm()) {
      const fullName = this.fullNameElement = document.getElementById('fullName').value
      const email = this.emailElement = document.getElementById('email').value
      const password = this.passwordElement = document.getElementById('password').value
      const checkPassword = this.repeatPasswordElement = document.getElementById('checkPassword').value

      let first_name = fullName.split(' ')[0]
      let last_name = fullName.substring(first_name.length).trim()

      if (last_name === '') {
        last_name = first_name
      }
      // Vfrcbv123q1@
      try {
        const result = await CustomHttp.request(config.host + "/signup", "POST", {
            name: first_name,
            lastName: last_name,
            email: email,
            password: password,
            passwordRepeat: checkPassword
          }
        )

        console.log(result)

        if (result) {
          if (result.error || !result.user) {
            console.log('ошибка')
            return
          }

          location.href = '#/login'

        }
      } catch (e) {

        return console.log(e)
      }
    }
  }
}