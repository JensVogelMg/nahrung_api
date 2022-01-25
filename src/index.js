import "./styles.css";
import "./styles.scss";

const ProductList = require('./controllers/ProductList')
const ProductSearch = require('./controllers/productsearch')
const ProductNutrients = require('./controllers/ProductNutrients')


const productSearch = new ProductSearch(
  document.getElementById('productSearchInput'),
  document.getElementById('productSearchButton'),
  document.getElementById('productSearchResults')
)

productSearch.init()

const productList = new ProductList(
  document.getElementById('productList')
) 
productList.init()
productList.addProduct(2011468)

const productNutrients = new ProductNutrients(
  document.querySelector('#productNutrient__carbs'),
  document.querySelector('#productNutrient__protein'),
  document.querySelector('#productNutrient__fat')
)
productNutrients.init()
productNutrients.setNutrients({
  carbs: 10,
  protein: 20,
  fat: 30
})


productSearch.events.on('productSelected', (fdcId) => {
  //ProduktSuche mit ProduktListe verknüpfen
  productList.addProduct(fdcId)
  //console.log('fdcId: ' + fdcId)
  
})

productList.events.on('nutrientChange', (nutrients) => {
  productNutrients.setNutrients(nutrients)
  //console.log('nutrients: ', nutrients)
})