import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { currencyCodes } from './currency-codes.js';
import CurrencyService from './service.js';

//Business Logic

async function getRates(amount, country) {
  const response = await CurrencyService.getRates();
  if  (!(`${country}` in response.conversion_rates) || isNaN(amount) || amount === null) {
    printError(response, country, amount);
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

/*function createDropDown() {
  let dropDown = document.getElementById('dropDown');
  let codes = currencyCodes;
  codes.forEach(function(code) {
    const item = document.createElement("item");
    item.value = code[0];
    item.text = code[0];
    dropDown.appendChild(item);
  }); 
}*/

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

document.addEventListener('DOMContentLoaded', function() {
  let dropDown = document.getElementById('dropDown');
  let codes = currencyCodes;
  console.log(codes);
  codes.forEach(function(code) {
    const option = document.createElement("option");
    option.value = code;
    option.text = code;
    dropDown.appendChild(option);
  }); 
  
});