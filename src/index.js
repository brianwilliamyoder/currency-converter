import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './service.js';
import { currencyCodes } from './currency-codes.js';

//Business Logic

async function getRates(country, amount) {
  const response = await CurrencyService.getRates(country, amount);
  if  (isNaN(amount) || amount === "" || !(`${country}` === response.target_code) ) {
    printError(country, response, amount);
  } else {
    printCurrency(country, amount, response);
  }
}

//UI Logic

function printCurrency(country, amount, response) {
  document.querySelector('#showCurrency').innerText = `${amount} USD is ${response.conversion_result} in ${country}`;
}

function printError(country, response, amount) {
  {
    if (isNaN(amount)) {
      document.querySelector('#showCurrency').innerText = `There was an error processing the exchange rate for amount ${amount}: ${response}. Please try again.`;
    }
    else {
      document.querySelector('#showCurrency').innerText = `There was an error processing the exchange rate for country code ${country}: ${response}. Please try again.`;
    }
  }
} 

function handleFormSubmission(event) {
  event.preventDefault();
  const country = document.getElementById("dropDown").value;
  const amount = document.querySelector('#amount-usd').value;
  document.querySelector('#amount-usd').value = null;
  document.getElementById('dropDown').value = "AED";
  getRates(country, amount);
}

function createDropDown() {
  let dropDown = document.getElementById('dropDown');
  let codes = currencyCodes;
  console.log(codes);
  codes.forEach(function(code) {
    const option = document.createElement("option");
    option.value = code[0];
    option.text = code[0];
    dropDown.appendChild(option);
  }); 
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

document.addEventListener('DOMContentLoaded', function() {
  createDropDown();
});