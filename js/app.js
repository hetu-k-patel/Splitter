const billInput = document.querySelector('#bill');
const buttons = document.querySelector('ul');
const customTipInput = document.querySelector('#customTip');
const peopleInput = document.querySelector('#people');
const displayTip = document.querySelector('#displayTip');
const displayTotal = document.querySelector('#displayTotal');
const reset = document.querySelector('#reset');
const allTipButtons = document.querySelectorAll('ul li button');

class App {
   #tip = 0;

   constructor() {
      this._reset();
      this._removeActiveClassOnButton();

      reset.addEventListener('click', this._reset.bind(this));
      buttons.addEventListener('click', this._getTipFromButton.bind(this));
      customTipInput.addEventListener(
         'keyup',
         this._removeActiveClassOnButton.bind(this)
      );
      billInput.addEventListener('keyup', this._calculateBill.bind(this));
      customTipInput.addEventListener('keyup', this._calculateBill.bind(this));
      peopleInput.addEventListener('keyup', this._calculateBill.bind(this));
   }

   _getTipFromButton(e) {
      this._removeActiveClassOnButton();
      if (e.target.nodeName === 'BUTTON') {
         customTipInput.value = '';
         if (e.target.classList.contains('active-button')) {
            this.#tip = 0;
            e.target.classList.remove('active-button');
         } else {
            this.#tip = e.target.dataset.tip;
            e.target.classList.add('active-button');
         }
      }
      this._calculateBill();
   }

   _reset() {
      this.#tip = 0;
      this._removeActiveClassOnButton();

      billInput.value = '';
      peopleInput.value = '';
      customTipInput.value = '';
      displayTip.textContent = '0.00';
      displayTotal.textContent = '0.00';
   }

   _removeActiveClassOnButton() {
      this.#tip = 0;
      allTipButtons.forEach((button) => {
         button.classList.remove('active-button');
      });
   }

   _calculateBill() {
      const bill = parseFloat(billInput.value);
      const tip = parseFloat(this.#tip) || parseFloat(customTipInput.value);
      const people = parseFloat(peopleInput.value) || 1;

      const totalTipAmount = (tip * bill) / 100 / people || 0;
      const totalBill = (bill + totalTipAmount) / people || 0;

      this._displayData(totalTipAmount, totalBill);
   }

   _displayData(tipAmount, total) {
      displayTip.textContent = tipAmount.toFixed(2) || '0.00';
      displayTotal.textContent = total.toFixed(2) || '0.00';
   }
}

const app = new App();
