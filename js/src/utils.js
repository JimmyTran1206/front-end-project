const allProductsUrl = 'https://dummyjson.com/products?limit=0';
const singleProductUrl = 'https://dummyjson.com/products/';
function getElement(selection) {
  const element = document.querySelector(selection);
  if (!element) {
    throw new Error(
      `Please check "${selection}" selector, no such element exist`,
    );
  }
  return element;
}
// format price from cents to dollar sign
function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat((price / 100).toFixed(2)));
  return formattedPrice;
}
// get items from local storage for products and cart
function getStorageItem(name) {
  let storageItem = [];
  if (localStorage.getItem(name)) {
    storageItem = JSON.parse(localStorage.getItem(name));
  }
  return storageItem;
}
// store items local storage for products and cart
function setStorageItem(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}
// function to shuffle array of number elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
  shuffleArray,
};
