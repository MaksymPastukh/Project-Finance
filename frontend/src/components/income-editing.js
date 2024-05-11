import {Income} from "./income.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";

export class IncomeEditing extends Income {
  constructor() {
    super(false);
    this.buttonSaveEditing = document.getElementById('save-income-button')
    this.buttonCancelEditing = document.getElementById('cancel-income-button')

    this.buttonSaveEditing.addEventListener('click', this.initIncomeEdit.bind(this));
    this.buttonCancelEditing.addEventListener('click', () => {
      window.location.href = '/#/income-category';
    })
  }

  async initIncomeEdit() {
    let idCategoryIncome = localStorage.getItem(this.idCategoryIncome)

    if (this.token && idCategoryIncome) {
      if (!this.token) location.href = "#/login";


      if (idCategoryIncome) {
        try {
          const result = await CustomHttp.request(config.host + "/categories/income/" + idCategoryIncome, "PUT", {
            title: this.inputSaveEditing.value
          });

          if (result) {
            if (!result) throw new Error('Error');

            localStorage.removeItem(this.idCategoryIncome);
            window.location.href = '/#/income-category';
          }
        } catch (e) {
          throw new Error(e);
        }
      }
    }
  }
}