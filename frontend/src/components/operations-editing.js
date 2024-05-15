import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Operations} from "./operations.js";
import {GetOperationsFilter} from "../utils/getOperationsFilter.js";

export class OperationsEditing extends Operations {
  constructor() {
    super(false);
    this.selectType = document.getElementById('operations-edit-type')
    this.inputAmount = document.getElementById('operations-edit-amount')
    this.inputDate = document.getElementById('operations-edit-date')
    this.inputComment = document.getElementById('operations-edit-comments')
    this.selectCategory = document.getElementById('operations-edit-category')
    this.buttonSaveEditing = document.getElementById('save-operations-button')
    this.buttonCancelEditing = document.getElementById('cancel-operations-button')
    this.arraySelectIncome = []
    this.arraySelectExpense = []

    this.buttonSaveEditing.addEventListener('click', this.initOperationsEdit.bind(this));
    this.buttonCancelEditing.addEventListener('click', () => {
      window.location.href = '/#/income-expenses';
    })

    this.initIncomeCategory()
    this.initExpenseCategory()
  }

  async initIncomeCategory() {
    try {
      const result = await CustomHttp.request(config.host + "/categories/income")
      if (result) {
        if (!result) throw new Error('Error')

        this.arraySelectIncome = result
        this.editingChangeSelectType()
        this.editingDateToSelectCategory()
      }
    } catch (e) {
      throw new Error(e)
    }

  }
  async initExpenseCategory() {
    try {
      const result = await CustomHttp.request(config.host + "/categories/expense")
      if (result) {
        if (!result) throw new Error('Error')

        this.arraySelectExpense = result

        this.editingChangeSelectType()
        this.editingDateToSelectCategory()
      }
    } catch (e) {
      throw new Error(e)
    }

  }


  async initOperationsEdit() {
    let idCategoryOperations = localStorage.getItem(this.idLocalStorage)

    if (this.token && idCategoryOperations) {
      if (!this.token) location.href = "#/login";

      if (idCategoryOperations) {
        try {
          const result = await CustomHttp.request(config.host + "/operations/" + idCategoryOperations, "PUT", {
            type: this.selectType.value,
            amount: +this.inputAmount.value,
            date: GetOperationsFilter.chengeToData(this.inputDate.value),
            comment: this.inputComment.value,
            category_id: +this.selectCategory.value
          });

          if (result) {
            if (!result) throw new Error('Error');

            localStorage.removeItem(this.idLocalStorage);

            window.location.href = '/#/income-expenses';
          }
        } catch (e) {
          throw new Error(e);
        }
      }
    }
  }

  editingChangeSelectType() {
    this.selectType.addEventListener('change', () => {
      this.selectCategory.innerHTML = "";
      this.editingDateToSelectCategory()
    })
  }

  editingDateToSelectCategory() {
    this.selectTypeElement = this.selectType.options[this.selectType.selectedIndex];
    this.selectTypeValue = this.selectTypeElement.value;

    if (this.selectTypeValue === 'income') {
      if(this.arraySelectIncome !== null)
      this.arraySelectIncome.forEach(item => {
        this.options = document.createElement("option");
        this.options.value = item.id;
        this.options.text = item.title;
        this.selectCategory.appendChild(this.options);
      });
    } else {
      if(this.arraySelectIncome !== null)
      this.arraySelectExpense.forEach(item => {
        this.options = document.createElement("option");
        this.options.value = item.id;
        this.options.text = item.title;
        this.selectCategory.appendChild(this.options);
      });
    }
  }
}