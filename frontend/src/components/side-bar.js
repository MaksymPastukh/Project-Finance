import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Auth} from "../services/auth.js";
import {Popup} from "./popup.js";

export class SideBar extends Popup {
  constructor() {
    super()

    this.balanceElement = document.getElementById('amount')
    this.profilElement = document.getElementById('profile')
    this.chengeBalanceElement = document.getElementById('change-balance-popup')
    this.message = {
      success: 'The balance amount has been successfully changed.',
      error: 'Please enter numeric value.',
    }
    this.init()
    this.popupChangeBalance()

  }


  async init() {
    const token = localStorage.getItem(Auth.accessToken)
    const userInfo = Auth.getUserInfo()

    if (!userInfo && !token) {
      location.href = "#/login"
    }

    if (token) {
      try {
        const resultBalance = await CustomHttp.request(config.host + "/balance")

        if (resultBalance) {
          if (resultBalance.error) {
            throw new Error(resultBalance.error)
          }

          this.balanceElement.innerText = resultBalance.balance
          this.profilElement.innerText = `${userInfo.name} ${userInfo.lastName}`

        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  popupChangeBalance() {
    this.chengeBalanceElement.addEventListener('click', () => {
      this.popupElement.classList.remove('hide')
      this.popupTextElement.textContent = 'You have the option of changing the amount'
      const input = document.createElement('input')
      input.type = 'text';
      input.pattern = '[1-9]'
      input.classList.add('input')
      this.popupTextElement.append(input)
      this.popupButtonOne.innerHTML = 'Save'
      this.popupButtonTwo.innerHTML = 'Cancel'
    })

    this.popupButtonOne.addEventListener('click', (event) => {
      let value = document.querySelector('.input').value
      this.initChange(value)
    })

    this.targetCloseModal()
  }

  async initChange(amount) {

    try {
      if (isNaN(amount) || amount === '') {
        this.popupContent.style.cssText = `
                        height: 10rem;
                    `;
        this.popupTextElement.textContent = this.message.error
        this.popupTextElement.style.color = 'red'
        this.popupButtonElement.style.display = 'none'

        setTimeout(() => {
          window.location.reload()

        }, 3000)

        return

      }

      const result = await CustomHttp.request(config.host + "/balance", "PUT", {
        newBalance: amount,
      })

      if (result) {

        if (!result) {
          throw new Error('Error')
        }

        this.popupContent.style.cssText = `
                        height: 10rem;
                    `;
        this.popupTextElement.textContent = this.message.success
        this.popupTextElement.style.color = 'green'
        this.popupButtonElement.style.display = 'none'

        setTimeout(() => {
          this.hide()
          window.location.reload()
        }, 3000)
      }

    } catch (e) {

    }
  }
}