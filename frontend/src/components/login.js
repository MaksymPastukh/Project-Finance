import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Auth} from "../services/auth.js";
import {Popup} from "./popup.js";

export class Login extends Popup {
  constructor() {
    super()

    const accessToken = localStorage.getItem(Auth.accessToken)
    if (accessToken) {
      location.href = "#/"
      return
    }

    this.emailElement = document.getElementById('email')
    this.passwordElement = document.getElementById('password')
    this.checkBoxElement = document.getElementById('checked')
    this.buttonElement = document.getElementById("logIn")
    this.buttonElement.addEventListener('click', this.processLogin.bind(this))
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

  async processLogin() {
    if (this.validateLogin()) {
      const email = this.emailElement.value
      const password = this.passwordElement.value

      try {
        // Отправляем данные на бекэнд
        const result = await CustomHttp.request(config.host + "/login", "POST", {
          email: email,
          password: password
        })

        if (result) {
          if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
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
              location.href = '#/login'
            }, 3000)

            throw new Error(result.message)
          }

          Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken )
          Auth.setUserInfo({
            name:result.user.name,
            lastName:result.user.lastName,
            email: email
          })

          location.href = "#/"

        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}