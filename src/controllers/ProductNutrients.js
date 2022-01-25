'use strict'


/**
 * 
 * @param {HTMLSpanElement} carbElement 
 * @param {HTMLSpanElement} proteinElement 
 * @param {HTMLSpanElement} fatElement 
 */
function ProductNutrients(carbElement, proteinElement, fatElement) {
  this.carbElement = carbElement
  this.proteinElement = proteinElement
  this.fatElement = fatElement
}

ProductNutrients.prototype.init = function() {

}

ProductNutrients.prototype.setNutrients = function(nutrients) {
  this.carbElement.innerText = Math.round(nutrients.carbs * 100) / 100
  this.proteinElement.innerText = Math.round(nutrients.protein * 100) / 100
  this.fatElement.innerText = Math.round(nutrients.fat * 100) / 100
}

module.exports = ProductNutrients