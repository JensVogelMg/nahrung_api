'use strict'

module.exports.productListTemplate = function productListTemplate({title, fdcId}) {
  return `<tr class="product__row" data-fdcid="${fdcId}">
                <td>
                  <span>${title}</span>
                </td>
                <td>
                  <input 
                    class="product-amount product-search__amount" 
                    type="number"
                    value="100"
                    min="0"
                    data-fdcid="${fdcId}" />
                  <button
                    class="close product-search__remove-product"
                    type="button"
                    data-dismiss="alert"
                    data-fdcid="${fdcId}"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </td>
              </tr>`
} 