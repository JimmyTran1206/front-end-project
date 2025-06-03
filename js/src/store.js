import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');
// extract the needed data for the project (data massaging)
function setupStore(products) {
  store = products.map((product) => {
    let {
      id,
      title: name,
      price,
      category,
      brand,
      sku,
      images,
      thumbnail,
      description,
    } = product;
    const image = images[0];
    price = Math.ceil(price * 100); // convert to cents for future payment system. Careful with the money! JS has weird rounding errors when taking data from API
    return {
      id,
      name,
      price,
      category,
      brand,
      sku,
      image,
      thumbnail,
      description,
    };
  });
  // save products to local storage
  setStorageItem('store', store);
}
function findProduct(idString) {
  return store.find((prod) => prod.id === parseInt(idString));
}
export { store, setupStore, findProduct };
