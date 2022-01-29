/**
 * @jest-environment jsdom
 */
'use strict'

const ProductList = require('./ProductList')

describe('ProductList', () => {
  beforeEach(() => {
    listElement = document.createElement('tbody')
    productList = new ProductList(listElement)
    
    describe('addFetchedProduct', () => {
      const product = {
        description: "TEST-Produkt",
        fdcId: '123456'
      }
      test('is Produkt pushed', () => {
        productList.addFetchedProduct(product)
        expect(productList.products.length).toBe(1)
        expect(productList.products[0].amount).toBe(100)
        expext(productList.products[0].product).toBe(product)
      })
    })
    
  })
})