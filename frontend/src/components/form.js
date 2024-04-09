import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config";

export class Form {
  constructor(page) {
    // Переменная для чекбокса
    this.checkedElement = null
    // Переменная для кнопки отправки формы
    this.sendButton = null
    this.email = null
    this.page = page

    this.inputsFields = [{
      name: 'email',
      id: 'email',
      element: null,
      regex: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
      isValid: false,
    }, {
      name: 'password',
      id: 'password',
      element: null,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      isValid: false,
    },]


    if (this.page === 'signup') {
      this.inputsFields.unshift({
          name: 'name',
          id: 'name',
          element: null,
          regex: /^[a-zA-Z\s]+$/,
          isValid: false,
        }, {
          name: 'checkPassword',
          id: 'checkPassword',
          element: null,
          isValid: false,
        },
      )
    }

    const these = this

    // Vfrcbv123q1@
    //Проверяем инпуны на валидность моментально без нажатия на кнопку
    this.inputsFields.forEach(item => {
      item.element = document.getElementById(item.id)
      console.log(item.element)
      item.element.onchange = function() {
        these.validateInputsFields.call(these, item, this)
      }
    })


    this.sendButton = document.getElementById('process-signup')
    this.sendButton.onclick = function () {

      these.processForm()
    }

    console.log(this.page)


    if (this.page === "login") {
      this.checkedElement = document.getElementById('agree')
      this.checkedElement.onchange = function () {
        these.validateForm()
      }
    }
  }

  validateInputsFields(field, element) {
    //Если в поле ввода пусто и если значения в поле ввода не совпадают с регулярным выражением тогда
    if (!element.value || !element.value.match(field.regex)) {
      element.classList.add('error-input');
      field.isValid = false
    } else {
      element.classList.remove('error-input')
      field.isValid = true
    }

    this.validateForm()
  }

  validateForm() {
    const validForm = this.inputsFields.every(el => el.isValid)
    const isValid = this.checkedElement ? this.checkedElement.checked && validForm : validForm

    if (isValid) {
      this.sendButton.removeAttribute('disabled')
    } else {
      this.sendButton.setAttribute('disabled', 'disabled')
    }

    return isValid
  }

  async processForm() {
    if (this.validateForm()) {
      const email = this.inputsFields.find(elem => elem.name === 'email').element.value
      const password = this.inputsFields.find(elem => elem.name === 'password').element.value
      const checkPassword = this.inputsFields.find(item => item.name === "checkPassword").element.value
      console.log(this.page)

      if (this.page === 'signup') {
        try {
          const result = await CustomHttp.request(config.host + "/signup", "POST", {
              name: this.inputsFields.find(item => item.name === "name").element.value,
              email: email,
              password: password,
              checkPassword: checkPassword
            }
          )

          if (result) {
            if (result.error || !result.user) {
              throw new Error(result.message)
            }

            this.email = result.user.email
          }

        } catch (e) {
          return console.log(e)
        }
      }

      try {
        const result = await CustomHttp.request(config.host + "/login", "POST", {
          email: email,
          password: password
        })


        if (result) {
          if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
            throw new Error(result.message)
          }
        }
      } catch (e) {

      }
    }
  }


}