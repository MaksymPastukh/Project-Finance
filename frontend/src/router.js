import {Signup} from "./components/sign-up.js";
import {Login} from "./components/login.js";
import {SideBar} from "./components/side-bar.js";
import {Logout} from "./components/logout.js";
import {Income} from "./components/income.js";

export class Router {
  constructor() {
    this.contentElement = document.getElementById("content")
    this.contentTitle = document.getElementById('title')
    this.styles = 'styles/output.scss';

    this.routes = [{
      route: '#/',
      title: 'Home',
      template: 'templates/main.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()
      }
    }, {
      route: '#/login',
      title: 'Log in',
      template: 'templates/login.html',
      styles: this.styles,
      layout: false,
      load: () => {
        new Login()
      }
    }, {
      route: '#/signup',
      title: 'Signup',
      template: 'templates/signup.html',
      styles: this.styles,
      layout: false,
      load: () => {
        new Signup()
      }
    }, {
      route: '#/income-expenses',
      title: 'income-Expenses',
      template: 'templates/income-expenses.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()

      }
    }, {
      route: '#/income-expenses-create',
      title: 'Income-Expenses-Create',
      template: 'templates/income-expenses-create.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()


      }
    }, {
      route: '#/income-expenses-edit',
      title: 'Income-Expenses-Edit',
      template: 'templates/income-expenses-editing.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()

      }
    }, {
      route: '#/expense-category',
      title: 'expense category',
      template: 'templates/expense-category.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
      }
    }, {
      route: '#/expense-create',
      title: 'Expense create',
      template: 'templates/expense-create-category.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()
      }
    }, {
      route: '#/expense-edit',
      title: 'expense edit',
      template: 'templates/expense-editing-category.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
      }
    }, {
      route: '#/income-category',
      title: 'income category',
      template: 'templates/income-category.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()
        new Income()
      }
    }, {
      route: '#/income-create',
      title: 'Income create',
      template: 'templates/income-create-category.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()
      }
    }, {
      route: '#/income-edit',
      title: 'Income edit',
      template: 'templates/income-editing-category.html',
      layout: 'templates/layout.html',
      styles: this.styles,
      load: () => {
        new SideBar()
        new Logout()
      }
    },
    ]
  }

  async startRouter() {
    const urlRoute = window.location.hash.split("?")[0]

    const newRoute =
      this.routes.find(item => item.route === urlRoute)

    if (!newRoute) {
      window.location.href = "#/"
      return
    }

    if (newRoute) {
      this.contentTitle.innerText = newRoute.title

      if (newRoute.template) {
        let contentBlock = this.contentElement
        if (newRoute.layout) {
          this.contentElement.innerHTML = await fetch(newRoute.layout)
            .then(response => response.text())
          contentBlock = document.getElementById('content-layout')
        }

        contentBlock.innerHTML = await fetch(newRoute.template).then(response => response.text())
      }

      if (newRoute.load && typeof newRoute.load === 'function') {
        newRoute.load()
      }
    }
  }
}