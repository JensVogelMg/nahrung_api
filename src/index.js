import "./styles.css";
import "./styles.scss";

const ProductList = require('./controllers/ProductList')
const ProductSearch = require('./controllers/productsearch')


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

productSearch.events.on('productSelected', (fdcId) => {
  //ProduktSuche mit ProduktListe verknüpfen
  productList.addProduct(fdcId)
  //console.log('fdcId: ' + fdcId)
  
})