import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './service.js';

//Business Logic

function getRates(amount, country) {
  const response = CurrencyService.getRates();
  if (response.result) {
    convertCurrency(amount, country);
  } else {
    handleError(country)
  }
}
//UI Logic

function convertCurrency(amount, country) {
}

function handleError(country) {
}

function handleFormSubmission(event) {
  event.preventDefault();
  const country = document.querySelector('#country').value;
  document.querySelector('#location').value = null;
  const amount = document.querySelector('#amount').value;
  document.querySelector('#amount').value = null;
  getRates(amount, country);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});