import './styles/output.scss';
import {Router} from "./router.js";

class App {
  constructor() {
    this.router = new Router()
    window.addEventListener('DOMContentLoaded', this.handelRouter.bind(this))
    window.addEventListener('popstate', this.handelRouter.bind(this))
  }
  handelRouter() {
    this.router.startRouter()
  }

}

(new App())