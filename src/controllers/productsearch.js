'use strict'

const { EventEmitter } = require('eventemitter3')
const eventemitter = require('eventemitter3')

const {search} = require('../api/products')
const {on} = require('../helfer/dom')

/**
 * 
 * @param {HTMLInputElement} inputElement 
 * @param {HTMLButtonElement} buttonElement
 * @param {HTMLUListElement} resultElement
 * 
 */

function ProductSearch(inputElement, buttonElement, resultElement) {
  this.inputElement = inputElement
  this.buttonElement = buttonElement
  this.resultElement = resultElement

  this.events = new EventEmitter()
}

ProductSearch.prototype.init = function() {
  this.buttonElement.addEventListener('click', (event) => {
    event.preventDefault()
    const inputValue = this.inputElement.value
    //console.log(inputValue)
    this.runSearch(inputValue)
  })
  on('.product-search--result-item', 'click', (event) => {
    event.originalEvent.preventDefault()
    const fdcId = event.handleObj.getAttribute('data-fdcid')
    console.log('event: ', fdcId)

    this.events.emit('productSelected', fdcId)
  })
}

ProductSearch.prototype.runSearch = function(term) {
  search(term).then((res) => {
    console.log('Ergebnisse: ', res)
    this.resultElement.innerHTML = ""
    for (const resElement of res) {
      const liElem = `<li 
        class="list-group-item list-group-item-action product-search--result-item"
        data-fdcid="${resElement.fdcId}">
        <a href="#">${resElement.description}</a>
          </li>`
      this.resultElement.innerHTML += liElem
    }
  })
}

module.exports = ProductSearch