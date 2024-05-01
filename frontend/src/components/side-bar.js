import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Auth} from "../services/auth.js";

export class SideBar {
  constructor() {
    this.balanceElement = document.getElementById('amount')
    this.profilElement = document.getElementById('profile')
    this.init()
  }

  async init() {
    const token = localStorage.getItem(Auth.accessToken)
    const userInfo = Auth.getUserInfo()

    if (!userInfo && !token) {
      location.href = "#/login"
    }

    if (token) {
      try {
        const result = await CustomHttp.request(config.host + "/balance")

        if (result) {
          if (result.error) {
            throw new Error(result.error)
          }

          this.balanceElement.innerText = result.balance
          this.profilElement.innerText = `${userInfo.name} ${userInfo.lastName}`

        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}