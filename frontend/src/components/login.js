import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config";

export class Login {
  constructor() {

    this.emailElement = document.getElementById('email')
    this.passwordElement = document.getElementById('password')
    this.checkBoxElement = document.getElementById('checked')
    this.processElement = document.getElementById("logIn")

    this.processElement.addEventListener('click', this.processForm.bind(this))
  }

  validateLogin() {
    let isValid = true

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

    if(!this.checkBoxElement.checked) {
      this.checkBoxElement.nextElementSibling.style.color = 'red'
      isValid = false;
    }

    return isValid
  }

  async processForm() {
    if (this.validateLogin()) {
      const email = this.emailElement.value
      const password = this.passwordElement.value

      try {
        // Отправляем данные на бекэнд
        const result = await CustomHttp.request(config.host + "/login", "POST", {
          email: email,
          password: password
        })

        // Если прошло успешно
        if (result) {
          console.log(result)
          if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
            throw new Error(result.message)
          }

          location.hash = "#/"
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}