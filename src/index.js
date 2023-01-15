import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './service.js';

//Business Logic

async function getRates(amount, country) {
  const response = await CurrencyService.getRates(country, amount);
  if  (!(`${country}` in response.conversion_rates) || isNaN(amount) || amount === null) {
    printError(response, country);
  } else {
    convertCurrency(amount, country, response);
  }
}

function convertCurrency(amount, country, response) {
  let exchangeRate= response.conversion_rates[`${country}`];
  let convertedAmount = amount * exchangeRate;
  printCurrency(amount, convertedAmount, country);
}
//UI Logic

function printCurrency(amount, convertedAmount, country) {
  document.querySelector('#showCurrency').innerText = `${amount} USD is ${convertedAmount} ${country}`;
}

function printError(response, country) {
  document.querySelector('#showCurrency').innerText = `There was an error processing the exchange rate for currency code ${country}: ${response["error-type"]}. Please try again`;
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