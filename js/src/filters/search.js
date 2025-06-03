import { getElement } from '../utils.js';
import display from '../displayProducts.js';
function setupSearch(store) {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('click', () => {
    // Deactivate active category buttons
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach((btn) => btn.classList.remove('active'));
  });
  nameInput.addEventListener('input', () => {
    const value = nameInput.value;
    if (value) {
      const filteredProducts = store.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase()),
      );
      if (filteredProducts.length >= 1) {
        display(filteredProducts, getElement('.products-container'));
      } else {
        const container = getElement('.products-container');
        container.innerHTML = `<h3 class="filter-error">Sorry, no product matched your search</h3>`;
      }
    } else {
      display(store, getElement('.products-container'));
    }
  });
}
export default setupSearch;
