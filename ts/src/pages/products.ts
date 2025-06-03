// global imports for functionality in index/products/product/about page
import '../toggleSidebar';
import '../cart/toggleCart';
import '../cart/setupCart';

//  filter imports
import setupSearch from '../filters/search';
import setupCategories from '../filters/categories';
import setupPrice from '../filters/price';

// specific imports
import { store, setupStore } from '../store';
import display from '../displayProducts';
import { getElement } from '../utils';
import fetchProducts from '../fetchProducts';

async function init(): Promise<void> {
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

  display(store, getElement('.products-container'));
  // set up the filters
  setupSearch(store);
  setupCategories(store);
  setupPrice(store);
  loading.style.display = 'none';
}
window.addEventListener('DOMContentLoaded', init);
