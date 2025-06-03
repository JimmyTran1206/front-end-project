import { getElement } from '../utils';
import display from '../displayProducts';
import { Product } from '../dataModel';

function setupPrice(store: Product[]): void {
  const priceInput = getElement('.price-filter') as HTMLInputElement;
  const priceValue = getElement('.price-value');

  // set up slider values
  const maxPrice = Math.ceil(
    Math.max(...store.map((product) => product.price)) / 100,
  );
  priceInput.max = maxPrice.toString();
  priceInput.min = '0';
  priceInput.value = maxPrice.toString(); // MUST set min-max before setting value
  priceValue.textContent = `Value: $${priceInput.value}`;

  priceInput.addEventListener('input', () => {
    // Deactivate active category buttons
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach((btn) => btn.classList.remove('active'));

    const value = parseInt(priceInput.value);
    priceValue.textContent = `Value: $${priceInput.value}`;
    const filteredProduct = store.filter(
      (product) => product.price / 100 <= value,
    );
    if (filteredProduct.length >= 1) {
      display(filteredProduct, getElement('.products-container'));
    } else {
      const container = getElement('.products-container');
      container.innerHTML = `<h3 class="filter-error">Sorry, no product matched your price range</h3>`;
    }
  });
}

export default setupPrice;
