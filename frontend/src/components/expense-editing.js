import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Expense} from "./expense.js";
export class ExpenseEditing extends Expense {
  constructor() {
    super(false);
    this.buttonSaveEditing = document.getElementById('save-expense-button')
    this.buttonCancelEditing = document.getElementById('cancel-expense-button')

    this.buttonSaveEditing.addEventListener('click', this.initExpenseEdit.bind(this));
    this.buttonCancelEditing.addEventListener('click', () => {
      window.location.href = '/#/expense-category';
    })

  }

  async initExpenseEdit() {
    let idCategoryExpense = localStorage.getItem(this.idCategoryExpense)

    if (this.token && idCategoryExpense) {
      if (!this.token) location.href = "#/login";

      if (idCategoryExpense) {
        try {
          const result = await CustomHttp.request(config.host + "/categories/expense/" + idCategoryExpense, "PUT", {
            title: this.inputSaveExpenseEditing.value
          });

          if (result) {
            if (!result) throw new Error('Error');

            localStorage.removeItem(this.idCategoryExpense);
            window.location.href = '/#/expense-category';
          }
        } catch (e) {
         throw new Error(e);
        }
      }
    }
  }
}