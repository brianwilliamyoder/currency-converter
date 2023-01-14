import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './service.js';

//Business Logic

function getRates(amount, country) {
  const response = CurrencyService.getRates();
  if (response.conversion_rates) {
    convertCurrency(amount, country, response);
  } else {
    printError(country, response);
  }
}

function convertCurrency(amount, country, response) {
  let exchangeRate= response.conversionRates[`${country}`];
  let convertedAmount = exchangeRate / amount;
  printCurrency(convertedAmount, country);
}
//UI Logic

function printCurrency(convertedAmount, country) {
  document.querySelector('#showCurrency').innerText = `You will have ${convertedAmount} in ${country}'s currency`;
}

function printError(country, response) {
  document.querySelector('#showCurrency').innerText = `There was an error processing the exchange rate for currency code ${country}: ${response}. Please try again`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount-usd').value;
  document.querySelector('#amount-usd').value = null;
  const country = document.querySelector('#country').value;
  document.querySelector('#country').value = null;
  getRates(amount, country);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});