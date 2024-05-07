import {Popup} from "./popup.js";
import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";

export class Income extends Popup {
  constructor() {
    super();
    this.incomeElements = document.getElementById('income-items')
    this.incomeElement = null
    this.buttonDelete = null
    this.dataId = null
    this.token = localStorage.getItem(Auth.accessToken)
    this.category = []

    this.initIncome()
  }

  async initIncome() {
    if (this.token) {
      if (!this.token) location.href = "#/login"
      try {
        const result = await CustomHttp.request(config.host + "/categories/income")
        if(result) {
          if(!result) throw new Error('Error')
          this.category = result

          this.processIncomeCategory()

        }
      }
      catch (e) {
        return e
      }



    }
  }

  processIncomeCategory() {
    if (this.category && this.category.length) {
      this.category.forEach(item => {
       this.incomeElement = document.createElement('div')
        this.incomeElement.className = 'income-item'
        this.incomeElement.setAttribute("data-id", item.id)

        const incomeElementTextElement = document.createElement("div")
        incomeElementTextElement.className = "income-item-title"
        incomeElementTextElement.innerText = item.title

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '/#/income-edit');
        const buttonElement = document.createElement('button');
        buttonElement.setAttribute('type', 'button');
        buttonElement.classList.add('button', 'edit');
        buttonElement.innerText = 'Edit';
        linkElement.appendChild(buttonElement);

        this.buttonDelete = document.createElement('button')
        this.buttonDelete.setAttribute('type', 'button');
        this.buttonDelete.classList.add('button', 'delete');
        this.buttonDelete.innerText = 'Delete'

        this.incomeElements.appendChild(this.incomeElement)
        this.incomeElement.appendChild(incomeElementTextElement)
        this.incomeElement.appendChild(linkElement)
        this.incomeElement.appendChild(this.buttonDelete)
      })

      const createElement = document.createElement('a');
      createElement.setAttribute('href', '/#/income-edit');
      const buttonCreateElement = document.createElement('button');
      buttonCreateElement.setAttribute('type', 'button');
      buttonCreateElement.classList.add('create');
      buttonCreateElement.innerText = '+';
      createElement.appendChild(buttonCreateElement);

      this.incomeElements.appendChild(createElement)

      this.deleteCategory()
    }
  }

async deleteCategory() {
    const test = document.querySelectorAll('.button.delete')
    test.forEach(item => {
      item.addEventListener('click', async (e) => {
        let incomeItem = e.target.closest('.income-item');

        if (incomeItem) {
          this.dataId = incomeItem.getAttribute('data-id');

          try {
            const result = await CustomHttp.request(config.host + "/categories/income/" + this.dataId, "DELETE")
            if (result) {
              if (!result) throw new Error('Error')

              console.log(result)
            }
          } catch (e) {
            return e
          }
        }
      })
    })
  }
}