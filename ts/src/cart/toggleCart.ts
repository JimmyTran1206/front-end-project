import { getElement } from '../utils';

const cartOverlay = getElement('.cart-overlay') as HTMLElement;
const closeCartBtn = getElement('.cart-close') as HTMLElement;
const toggleCartBtn = getElement('.toggle-cart') as HTMLElement;

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
  const eventTarget = e.target as HTMLElement;
  const insideCartArea = eventTarget.closest('.cart');
  if (!insideCartArea) {
    cartOverlay.classList.remove('show');
  }
});

export function openCart(): void {
  cartOverlay.classList.add('show');
}
