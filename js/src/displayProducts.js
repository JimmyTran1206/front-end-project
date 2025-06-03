import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
// use function declaration event handler to avoid assigning multiple eventListeners to the container upon filtering.
function addToCartClickHandler(e) {
  const eventTarget = e.target;
  const parent = eventTarget.closest('.product-cart-btn');
  if (parent) {
    addToCart(parent.dataset.id);
  }
}
// display individual products and add event listener to the container elelment:
function display(products, element) {
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
