import {Auth} from "./auth";

export class CustomHttp {

  static async request(url, method = "GET", body = null) {
    const params = {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }

    if (body) {
      params.body = JSON.stringify(body)
    }

    this.popupElement = document.getElementById('popup')
    this.popupContent = document.getElementById('popup-content')
    this.popupTextElement = document.getElementById('popup-text')
    this.popupButtonElement = document.getElementById('popup-button')

    const response = await fetch(url, params)
    const statusData = await response.json()
    console.log(statusData.message)
    this.popupElement.classList.remove('hide')
    this.popupContent.style.cssText = `
                        height: 10rem;
                    `;
    this.popupTextElement.textContent = statusData.message
    this.popupTextElement.style.color = 'red'
    this.popupButtonElement.style.display = 'none'

    setTimeout(() => {
      this.popupElement.classList.add('hide')
      location.href = '#/signup'
    }, 13000)


    if (response.status < 200 || response.status >= 300) {



      if (response.status === 401) {
        let result = await Auth.unauthorizedProcessResponse()


        if (result) {

          return await this.request(url, method, body)
        } else {
          return null
        }


      }



      throw new Error(response.message)

    }


    return await response.json()
  }
}