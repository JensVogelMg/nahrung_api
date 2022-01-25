'use strict'

const {info} = require('../api/products')
const {on} = require('../helfer/dom')
const {productListTemplate} = require('../templates/productsList')

/**
 * 
 * @param {HTMLTableElement} listElement 
 */
function ProductList(listElement) {
  this.products = []
  this.listElement = listElement
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

ProductList.prototype.updateAmount = function(fdcId, value) {
  for (const product of this.products) {
    if (product.product['fdcId'] === fdcId) {
      product.amount = value
      //console.log('product: ', product)
      break
    }
  }
  console.log('update amount: ', this.products)
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
  console.log(this.products)
}

ProductList.prototype.addProduct = function(fdcId) {
  info(fdcId)
    .then((product) => {
      this.products.push({
        amount: 100,
        product
      })
      this.listElement.insertAdjacentHTML('beforeend', productListTemplate({
        title: product['description'],
        fdcId: fdcId
      }))
    })
}

module.exports = ProductList