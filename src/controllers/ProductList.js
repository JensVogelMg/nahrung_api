'use strict'

const {info} = require('../api/products')
const {on} = require('../helfer/dom')
const {productListTemplate} = require('../templates/productsList')
const EventEmitter = require('eventemitter3')

/**
 * 
 * @param {HTMLTableElement} listElement 
 */
function ProductList(listElement) {
  this.products = []
  this.listElement = listElement
  this.events = new EventEmitter()
}

ProductList.prototype.init = function() {
  on('.product-search__remove-product', 'click', (event) => {
    const fdcId = parseInt(event.handleObj.getAttribute('data-fdcid'), 10)
    //console.info('wirklich löschen?', event, fdcId)
    this.removeProduct(fdcId)
  })

  on('.product-search__amount', 'change', (event) => {
    const fdcId = parseInt(event.handleObj.getAttribute('data-fdcid'), 10)
    this.updateAmount(fdcId, parseInt(event.handleObj.value), 10)
    //console.log('.product-search__amount: ', parseInt(event.handleObj.value, 10))
  })
}

ProductList.prototype.emitNutrients = function() {
  const nutrients = this.getNutrients()
  this.events.emit('nutrientChange', nutrients)
}

/**
 * Hole die Nährwertinformationen aus einem Produkt
 * @param {object} product 
 * @returns Nährwertinformationen aus einem Produkt
 */
ProductList.prototype.getNutrientsForProduct = function(product) {
  const nutrients = {
    carbs: 0,
    protein: 0,
    fat: 0
  }
  for(const foodNutrient of product.product.foodNutrients) {
    if (('' + foodNutrient.nutrient.number) === '205') {
      nutrients.carbs = foodNutrient.amount
    } else if (('' + foodNutrient.nutrient.number) === '204') {
        nutrients.fat = foodNutrient.amount
    } else if (('' + foodNutrient.nutrient.number) === '203') {
      nutrients.protein = foodNutrient.amount
    }
  }

  return {
    carbs: (nutrients.carbs / 100) * product.amount,
    protein: (nutrients.protein / 100) * product.amount,
    fat: (nutrients.fat / 100) * product.amount
  }
}

/**
 * Nährwertmengen addieren
 * @returns Nährwertmengen
 */
ProductList.prototype.getNutrients = function() {
  const nutrients = {
    carbs: 0,
    protein: 0,
    fat: 0
  }
  for(const product of this.products) {
    const productNutrients = this.getNutrientsForProduct(product)

    nutrients.carbs += productNutrients.carbs
    nutrients.protein += productNutrients.protein
    nutrients.fat += productNutrients.fat
  }
  return nutrients
}

ProductList.prototype.updateAmount = function(fdcId, value) {
  for (const product of this.products) {
    if (product.product['fdcId'] === fdcId) {
      product.amount = value
      //console.log('product: ', product)
      break
    }
  }
  this.emitNutrients()
  //console.log('update amount: ', this.products)
}

ProductList.prototype.removeProduct = function(fdcId) {
  let index = null
  for(const i in this.products) {
    const product = this.products[i]
    if (product.product['fdcId'] === fdcId) {
      index = i
      break
    }
  }

  if (index !== null) {
    this.products.splice(index, 1)
    const productRow = document.querySelector('.product__row[data-fdcid="' + fdcId + '"]')
    if (productRow) productRow.remove()
  } 
  this.emitNutrients() 
  //console.log(this.products)
}

ProductList.prototype.addProduct = function(fdcId) {
  //console.log('fdcId: ', fdcId)
  for (const product of this.products) {
    //console.log('fdcId_list: ', product.product['fdcId'])
    if (('' + product.product['fdcId']) === ('' + fdcId)) {
      //console.log('schon da')
      return
    }
  }
  info(fdcId)
  
    .then((product) => this.addFetchedProduct(product))
    .catch((err) => {
      console.error("Produkt konnte nicht hinzugefügt werden")
    })
}

ProductList.prototype.addFetchedProduct = function(product) {
  this.products.push({
    amount: 100,
    product
  })
  this.listElement.insertAdjacentHTML('beforeend', productListTemplate({
    title: product['description'],
    fdcId: fdcId
  }))

  //this.getNutrients()
  this.emitNutrients()
}

module.exports = ProductList