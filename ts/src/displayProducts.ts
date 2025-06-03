import { formatPrice } from './utils';
import { addToCart } from './cart/setupCart';
import { Product } from './dataModel';

// use function declaration event handler to avoid assigning multiple eventListeners to the container upon filtering.
function addToCartClickHandler(e: Event): void {
  const eventTarget = e.target as HTMLElement;
  const parent = eventTarget.closest('.product-cart-btn') as HTMLElement;
  if (parent) {
    addToCart(parent.dataset.id!);
  }
}

// display individual products and add event listener to the container elelment:
function display(products: Product[], element: HTMLElement): void {
  element.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      return `
    <article class="product">
          <div class="product-container">
            <img src="${image}" alt="${name}" class="product-img img" />
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon"
                ><i class="fas fa-search"></i
              ></a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article>
    `;
    })
    .join('');

  element.addEventListener('click', addToCartClickHandler);
}

export default display;
