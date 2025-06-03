import { getElement } from '../utils.js';
const cartOverlay = getElement('.cart-overlay');
const closeCartBtn = getElement('.cart-close');
const toggleCartBtn = getElement('.toggle-cart');
// cart button
toggleCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show');
});
// close cart button
closeCartBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('show');
});
// close cart if click outside the cart area
cartOverlay.addEventListener('click', (e) => {
  const eventTarget = e.target;
  const insideCartArea = eventTarget.closest('aside.cart');
  if (!insideCartArea) {
    cartOverlay.classList.remove('show');
  }
});
export function openCart() {
  cartOverlay.classList.add('show');
}
