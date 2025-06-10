import { getElement } from '../utils';
import { Product } from '../dataModel';
import { displayPagination } from '../pagination/displayPagination';

function setupCategories(store: Product[]): void {
  const categories: string[] = [
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
  categoriesContainer.addEventListener('click', (e: Event) => {
    // Deactivate all currently-active category buttons
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach((btn) => btn.classList.remove('active'));
    const eventTarget = e.target as HTMLElement;
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
      displayPagination(productUnderCategory);
    }
  });
}

export default setupCategories;
