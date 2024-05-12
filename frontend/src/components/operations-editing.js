import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Operations} from "./operations.js";

export class OperationsEditing extends Operations {
  constructor() {
    super(false);
    this.inputType = document.getElementById('operations-edit-type')
    this.inputAmount = document.getElementById('operations-edit-amount')
    this.inputDate = document.getElementById('operations-edit-date')
    this.inputComment = document.getElementById('operations-edit-comments')
    this.inputCategory = document.getElementById('operations-edit-category')
    this.buttonSaveEditing = document.getElementById('save-operations-button')
    this.buttonCancelEditing = document.getElementById('cancel-operations-button')

    this.buttonSaveEditing.addEventListener('click', this.initOperationsEdit.bind(this));
    this.buttonCancelEditing.addEventListener('click', () => {
      window.location.href = '/#/income-expenses';
    })
  }

  async initOperationsEdit() {
    let idCategoryOperations = localStorage.getItem(this.idLocalStorage)

    if (this.token && idCategoryOperations) {
      if (!this.token) location.href = "#/login";


      if (idCategoryOperations) {
        try {
          const result = await CustomHttp.request(config.host + "/operations/" + idCategoryOperations, "PUT", {
            type: this.inputType.value,
            amount: +this.inputAmount.value,
            date: Operations.chengeData(this.inputDate.value),
            comment: this.inputComment.value,
            category_id: this.inputCategory.value
          });

          if (result) {
            if (!result) throw new Error('Error');

            localStorage.removeItem(this.idCategoryIncome);
            window.location.href = '/#/income-expenses';
          }
        } catch (e) {
          throw new Error(e);
        }
      }
    }
  }
}