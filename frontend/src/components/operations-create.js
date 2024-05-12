import {Operations} from "./operations.js";
import {CustomHttp} from "../services/custom-http";
import config from "../config/config";

export class OperationsCreate extends Operations {
  constructor() {
    super(false);
    this.inputType = document.getElementById('income-expenses-type')
    this.inputAmount = document.getElementById('income-expenses-amount')
    this.inputDate = document.getElementById('income-expenses-date')
    this.inputComment = document.getElementById('income-expenses-comments')
    this.inputCategory = document.getElementById('income-expenses-category')
    this.buttonCreateOf = document.getElementById('income-expenses-create')
    this.buttonCancelOf = document.getElementById('income-expenses-cancel')

    this.buttonCreateOf.addEventListener('click', this.initCreating.bind(this));
    this.buttonCancelOf.addEventListener('click', () => {
      window.location.href = '/#/income-expenses';
    })
  }

  async initCreating() {
    if (this.token) {
      if (!this.token) location.href = "#/login";
      try {
        const result = await CustomHttp.request(config.host + "/operations", "POST", {
          type: this.inputType.value,
          amount: +this.inputAmount.value,
          date: Operations.chengeData(this.inputDate.value),
          comment: this.inputComment.value,
          category_id: this.inputCategory.value
        });

        if (result) {
          if (!result) throw new Error('Error');
          window.location.href = '/#/income-expenses';
        }
      } catch (e) {
        return e;
      }
    }
  }
}