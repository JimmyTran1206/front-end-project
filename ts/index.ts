// global imports for functionality in index/products/product/about page
import './src/toggleSidebar';
import './src/cart/toggleCart';
import './src/cart/setupCart';

// special import for index page:
import fetchProducts from './src/fetchProduct';
import { setupStore, store } from './src/store';
import display from './src/displayProducts';
import { getElement, shuffleArray } from './src/utils';
import { Product } from './src/dataModel';

// Function to fetch featured products once the page load
async function init(): Promise<void> {
  try {
    if (store.length === 0) {
      const data = await fetchProducts();
      const products = data?.products;
      if (products) {
        // add products to the store
        setupStore(products);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    // find the featured products (three products random id from 1 to 10)
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const featuredIds = shuffleArray(ids).slice(0, 3);
    const featuredProducts: Product[] = [];
    featuredIds.forEach((id) => {
      featuredProducts.push(store.find((prod) => prod.id === id)!);
    });
    display(featuredProducts, getElement('.featured-center'));
  }
}
window.addEventListener('DOMContentLoaded', init);
