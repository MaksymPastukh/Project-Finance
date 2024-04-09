import {Form} from "./components/form.js";

export class Router {
  constructor() {
    this.contentElement = document.getElementById("content")
    this.contentAuth = document.getElementById('auth')
    this.contentLayout = document.getElementById('layout')
    this.styles = 'styles/output.scss';

    this.routes = [{
      route: '#/',
      title: 'Home',
      template: 'templates/main.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/login',
      title: 'Log in',
      template: 'templates/login.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/signup',
      title: 'Signup',
      template: 'templates/signup.html',
      styles: this.styles,
      load: () => {
        new Form('signup')
      }
    }, {
      route: '#/income-expenses',
      title: 'income-Expenses',
      template: 'templates/income-expenses.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/income-expenses-create',
      title: 'Income-Expenses-Create',
      template: 'templates/income-expenses-create.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/income-expenses-edit',
      title: 'Income-Expenses-Edit',
      template: 'templates/income-expenses-editing.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/expense-category',
      title: 'expense category',
      template: 'templates/expense-category.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/expense-create',
      title: 'Expense create',
      template: 'templates/expense-create-category.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/expense-edit',
      title: 'expense edit',
      template: 'templates/expense-editing-category.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/income-category',
      title: 'income category',
      template: 'templates/income-category.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/income-create',
      title: 'Income create',
      template: 'templates/income-create-category.html',
      styles: this.styles,
      load: () => {
      }
    }, {
      route: '#/income-edit',
      title: 'Income edit',
      template: 'templates/income-editing-category.html',
      styles: this.styles,
      load: () => {
      }
    },
    ]
  }

  async startRouter() {
    const urlRoute = window.location.hash.split("?")[0]


    const newRoute =
      this.routes.find(item => item.route === urlRoute)

    console.log(newRoute)


    if (!newRoute) {
      window.location.href = '#/'
      return
    }

    if (newRoute.route === '#/signup') {
      this.contentLayout.style.display = 'none'
      this.contentAuth.innerHTML = await fetch(newRoute.template)
        .then(response => response.text())
      newRoute.load()
    }

    this.contentElement.innerHTML = await fetch(newRoute.template)
      .then(response => response.text())
    newRoute.load()
  }

}