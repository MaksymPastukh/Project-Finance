import {Income} from "./income";
import {CustomHttp} from "../services/custom-http";
import config from "../config/config";

export class IncomeEditing extends Income {
  constructor() {
    super();

    this.buttonSaveEditing = document.getElementById('save-income-button')
    this.buttonCancelEditing = document.getElementById('cancel-income-button')

    this.buttonSaveEditing.addEventListener('click', this.initIncomeEdit.bind(this));
    this.buttonCancelEditing.addEventListener('click', () => {
      window.location.href = '/#/income-category';
    })
  }

  async initIncomeEdit() {
    let idCategory = localStorage.getItem(this.idCategory)
    console.log(idCategory)

    if (this.token && idCategory) {
      if (!this.token) location.href = "#/login";


      if (idCategory) { // Используем переданное значение data вместо this.data
        try {
          const result = await CustomHttp.request(config.host + "/categories/income/" + idCategory, "PUT", {
            title: this.inputSaveEditing.value
          });

          if (result) {
            if (!result) throw new Error('Error');

            localStorage.removeItem(this.idCategory);
            window.location.href = '/#/income-category';
          }
        } catch (e) {
          return e;
        }
      }
    }
  }
}