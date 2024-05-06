export class Popup {
  constructor() {


    this.popupElement = document.getElementById('popup');
    this.popupContent = document.getElementById('popup-content');
    this.popupTextElement = document.getElementById('popup-text');
    this.popupButtonElement = document.getElementById('popup-button');
    this.popupButtonOne = document.getElementById('button-one');
    this.popupButtonTwo = document.getElementById('button-two');

  }

  show() {
    this.popupElement.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.popupElement.classList.add('hide');
    this.popupElement.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalShow() {
    this.popupElement.forEach(item => {
      item.addEventListener('click', (e) => {
        const productTitle = e.target.closest('.item-order').querySelector('.name-order');
        if (productTitle) {
          this.popupElement.value = productTitle.innerText;
          this.show();
        }
      })
    })
  }


  targetCloseModal() {
    this.popupElement.addEventListener('click', (e) => {
      if (e.target === this.popupElement) {

        this.hide()
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.popupElement.classList.contains('show')) {
        this.hide();

      }
    })

    this.popupButtonTwo.addEventListener('click', () => {
      this.hide()
    })
  }
}