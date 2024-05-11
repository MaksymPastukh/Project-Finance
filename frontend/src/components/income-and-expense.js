import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../config/config.js";
import {Popup} from "./popup.js";

export class IncomeAndExpense extends Popup{
  constructor() {
    super()
    this.header = document.querySelector('.tabs-header')
    this.tab = document.querySelectorAll('.tabs-header-item')
    this.content = document.querySelectorAll('.tabs-content-item')
    this.display = 'flex'
    this.token = localStorage.getItem(Auth.accessToken)
    this.array = []

    this.init()
    this.initTabs()


  }

  hideTabContent() {
    this.content.forEach(item => {
      item.style.display = 'none'
    });
    this.tab.forEach(item => {
      item.classList.remove('active')
    });
  }

  showTabContent(i = 0) {
    this.content[i].style.display = this.display
    this.tab[i].classList.add('active')
  }

  initTabs() {
    this.hideTabContent()
    this.showTabContent()
    
    this.header.addEventListener('click', (e) => {
      const target = e.target.closest('.tabs-header-item');
      if (!target) return;

      const index = Array.from(this.tab).indexOf(target);
      if (index === -1) return;

      this.tab.forEach((item, idx) => {
        item.classList.remove('active');
        if (idx === index) {
          item.classList.add('active');
        }
      });

      this.content.forEach((item, idx) => {
        item.style.display = idx === index ? this.display : 'none';
      });
    });
  }


  static async getOperations(period = 'period', dateFrom = null, dateTo = null) {
    let url = config.host + '/operations'

    switch (period) {
      case 'week':
        url += '?period=week'
        break;
      case 'month':
        url += '?period=month'
        break;
      case 'year':
        url += '?period=year'
        break;
      case 'all':
        url += '?period=all'
        break;
      case 'interval':
        if (dateFrom && dateTo) {
          url += `period=interval&dateFrom=${IncomeAndExpense.formatDateFromISO(dateFrom)}&dateTo=${IncomeAndExpense.formatDateFromISO(dateTo)}`
        } else {
          url += `period=interval&dateFrom=${IncomeAndExpense.formatDateFromISO()}&dateTo=${IncomeAndExpense.formatDateFromISO()}`
        }
        break;
    }

    return url
  }


 async init() {
    if (this.token) {
      if (!this.token) location.href = '#/login'
      try {
        const result = await CustomHttp.request(config.host + "/operations")

        console.log(result)
        if (result) {
          if (!result) throw new Error('Error')

          this.array = result
        }
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  static formatDateFromISO(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}