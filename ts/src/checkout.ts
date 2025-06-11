// check out functionality, only read from setupCart to avoid concurrency modification and quirky JavaScript behavior
import { formatPrice, getElement } from './utils';
import { resetCart, readCart } from './cart/setupCart';

const checkoutBtn = getElement('.cart-checkout');
const dialog = getElement('dialog') as HTMLDialogElement;
const dialogText = getElement('.dialog-text');
const dialogCloseBtn = getElement('.dismiss-modal');
const cartOverlay = getElement('.cart-overlay');

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

checkoutBtn.addEventListener('click', () => {
  console.log('Checkout btn clicked');
  const cart = readCart(); // read from setupCart module to ensure cohesion
  console.log(cart);
  cartOverlay.classList.remove('show');
  if (cart.length === 0) {
    // no item in the cart/no cart in local storage
    dialogText.textContent = 'No item in your cart!';
    dialogCloseBtn.textContent = 'Back to shopping';
  } else {
    dialogText.textContent = 'Thank you for your purchase!';
    dialogCloseBtn.textContent = 'Go to payment';
    // remove items cart items and update the UI
    resetCart(); // override the control variable in setupCart
    cartItemCountDOM.textContent = '0';
    cartTotalDOM.textContent = `Total: ${formatPrice(0)}`;
    cartItemsDOM.replaceChildren();
  }

  dialog.showModal();
});

dialogCloseBtn.addEventListener('click', () => {
  dialog.close();
});
