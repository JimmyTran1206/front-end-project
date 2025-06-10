// global imports for functionality in index/products/product/about page
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// filter imports
import setupSearch from '../filters/search.js';
import setupCategories from '../filters/categories.js';
import setupPrice from '../filters/price.js';
// pagination imports
import { displayPagination } from '../pagination/displayPagination.js';
// specific imports
import { store, setupStore } from '../store.js';
import { getElement } from '../utils.js';
import fetchProducts from '../fetchProducts.js';
async function init() {
  const loading = getElement('.page-loading');
  // fetch products to store in case users bypass homepage and go directly to product page
  if (store.length === 0) {
    try {
      const data = await fetchProducts();
      const products = data?.products;
      if (products) {
        // add products to the store
        setupStore(products);
      }
    } catch (error) {
      console.log(error);
    }
  }
  displayPagination(store);
  // set up the filters
  setupSearch(store);
  setupCategories(store);
  setupPrice(store);
  loading.style.display = 'none';
}
window.addEventListener('DOMContentLoaded', init);
