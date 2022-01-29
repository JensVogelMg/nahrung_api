/**
 * @jest-environment jsdom
 */
'use strict'

const ProductNutrients = require('./ProductNutrients')

describe('ProductNutrients', () => {
  let carbElement, proteinElement, fatElement, productNutrients

  beforeEach(() => {
    carbElement = document.createElement('span')
    proteinElement = document.createElement('span')
    fatElement = document.createElement('span')

    productNutrients = new ProductNutrients(
      carbElement,
      proteinElement,
      fatElement
    )
  })
  test("wird ein neues Objekt ProductNutrients angelegt?", () => {
    expect(productNutrients).not.toBeNull()
  })

  describe('setNutrients', () => {
    test('werden die carbs ins DOM geschrieben', () => {
      productNutrients.setNutrients({
        carbs: 100,
        protein: 0,
        fat: 0
      })
      expect(carbElement.textContent).toBe('100')
      expect(proteinElement.textContent).toBe('0')
      expect(fatElement.textContent).toBe('0')
    })
    test('werden die Proteine ins DOM geschrieben', () => {
      productNutrients.setNutrients({
        carbs: 0,
        protein: 100,
        fat: 0
      })
      expect(carbElement.textContent).toBe('0')
      expect(proteinElement.textContent).toBe('100')
      expect(fatElement.textContent).toBe('0')
    })
    test('werden die Fette ins DOM geschrieben', () => {
      productNutrients.setNutrients({
        carbs: 0,
        protein: 0,
        fat: 100
      })
      expect(carbElement.textContent).toBe('0')
      expect(proteinElement.textContent).toBe('0')
      expect(fatElement.textContent).toBe('100')
    })
    test('werden die Werte gerundet', () => {
      productNutrients.setNutrients({
        carbs: 3.3333333,
        protein: 2.77777777777,
        fat: 7.123123123
      })
      expect(carbElement.textContent).toBe('3.33')
      expect(proteinElement.textContent).toBe('2.78')
      expect(fatElement.textContent).toBe('7.12')
    })
  })
});
