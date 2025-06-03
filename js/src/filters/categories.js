import { getElement } from '../utils.js';
import display from '../displayProducts.js';
function setupCategories(store) {
  const categories = [
    'all',
    ...new Set(store.map((product) => product.category)),
  ];
  const categoriesContainer = getElement('.categories');
  categoriesContainer.innerHTML = categories
    .map((category) => {
      return `
    <button class="category-btn">${category}</button>
    `;
    })
    .join('');
  categoriesContainer.addEventListener('click', (e) => {
    // Deactivate all currently-active category buttons
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach((btn) => btn.classList.remove('active'));
    const eventTarget = e.target;
    if (eventTarget.classList.contains('category-btn')) {
      eventTarget.classList.add('active');
      let productUnderCategory = [];
      if (eventTarget.textContent === 'all') {
        productUnderCategory = [...store];
      } else {
        productUnderCategory = store.filter(
          (product) => product.category === eventTarget.textContent,
        );
      }
      display(productUnderCategory, getElement('.products-container'));
    }
  });
}
export default setupCategories;
