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
    this.idCategory = 'idCategory'
    this.data = null
    this.token = localStorage.getItem(Auth.accessToken)
    this.category = []
    this.inputSaveEditing = document.getElementById('input-income-category')

    this.initIncome()
  }

  async initIncome() {
    if (this.token) {
      if (!this.token) location.href = "#/login"
      try {
        const result = await CustomHttp.request(config.host + "/categories/income")
        if (result) {
          if (!result) throw new Error('Error')
          this.category = result

          this.processIncomeCategory()

        }
      } catch (e) {
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

        this.buttonEdit = document.createElement('button');
        this.buttonEdit.setAttribute('id', 'button-edit');
        this.buttonEdit.classList.add('button', 'edit-category');
        this.buttonEdit.innerText = 'Edit';

        this.buttonDelete = document.createElement('button')
        this.buttonDelete.setAttribute('type', 'button');
        this.buttonDelete.classList.add('button', 'delete');
        this.buttonDelete.innerText = 'Delete'

        this.incomeElements.appendChild(this.incomeElement)
        this.incomeElement.appendChild(incomeElementTextElement)
        this.incomeElement.appendChild(this.buttonEdit)
        this.incomeElement.appendChild(this.buttonDelete)
      })

      const createElement = document.createElement('a');
      createElement.setAttribute('href', '/#/income-create');
      const buttonCreateElement = document.createElement('button');
      buttonCreateElement.setAttribute('type', 'button');
      buttonCreateElement.classList.add('create');
      buttonCreateElement.innerText = '+';
      createElement.appendChild(buttonCreateElement);
      this.incomeElements.appendChild(createElement)

      this.deleteCategory()
      this.editingIncomeCategory = this.editingIncomeCategory.bind(this); // Привязка контекста
      this.editingIncomeCategory(); // Вызов метода
    }
  }

  deleteCategory() {
    const deleteCategory = document.querySelectorAll('.button.delete')
    deleteCategory.forEach(item => {
      item.addEventListener('click', async (e) => {
        let incomeItem = e.target.closest('.income-item');

        if (incomeItem) {
          this.dataId = incomeItem.getAttribute('data-id');

          try {
            const result = await CustomHttp.request(config.host + "/categories/income/" + this.dataId, "DELETE")
            if (result) {
              if (!result) throw new Error('Error')

              window.location.reload()
            }
          } catch (e) {
            return e
          }
        }
      })
    })
  }

  editingIncomeCategory() {
    const valueCategory = document.querySelectorAll('.button.edit-category')
    valueCategory.forEach(item => {
      item.addEventListener('click', (e) => {
        let incomeItem = e.target.closest('.income-item');
        if (incomeItem) {
          this.data = incomeItem.getAttribute('data-id');
          localStorage.setItem(this.idCategory, this.data);
          window.location.href = '/#/income-edit'
        }
      })
    })
  }
}