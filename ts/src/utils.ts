const allProductsUrl: string = 'https://dummyjson.com/products?limit=50';

const singleProductUrl: string = 'https://dummyjson.com/products/';

function getElement(selection: string): HTMLElement {
  const element = document.querySelector(selection) as HTMLElement | null;
  if (!element) {
    throw new Error(
      `Please check "${selection}" selector, no such element exist`,
    );
  }
  return element;
}

// format price from cents to dollar sign
function formatPrice(price: number): string {
  const formattedPrice: string = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat((price / 100).toFixed(2)));
  return formattedPrice;
}

// get items from local storage for products and cart
function getStorageItem(name: string): any[] {
  let storageItem: any[] = [];
  if (localStorage.getItem(name)) {
    storageItem = JSON.parse(localStorage.getItem(name)!);
  }
  return storageItem;
}

// store items local storage for products and cart
function setStorageItem(name: string, item: any[]): void {
  localStorage.setItem(name, JSON.stringify(item));
}

// function to shuffle array of number elements
function shuffleArray(array: number[]): number[] {
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
