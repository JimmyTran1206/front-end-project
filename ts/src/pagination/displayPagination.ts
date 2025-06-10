import display from '../displayProducts';
import displayButtons from './displayButtons';
import paginate from './paginate';
import { getElement } from '../utils';
import { Product } from '../dataModel';

// function to display pagination given an input product array
const btnContainer = document.querySelector('.btn-container') as HTMLElement;
let index: number = 0;
let storePages: Product[][] = []; // array of product arrays

function setupUI(): void {
  display(storePages[index], getElement('.products-container'));
  displayButtons(btnContainer, storePages, index); // pass in the index to check active button UI
}

// Every time the button is clicked, regenerate the UI
function paginationBtnHandler(e: Event): void {
  const eventTarget = e.target as HTMLElement;
  if (eventTarget.classList.contains('btn-container')) return;
  if (eventTarget.classList.contains('page-btn')) {
    index = parseInt(eventTarget.dataset.index!);
  }
  if (eventTarget.classList.contains('next-btn')) {
    index++;
    if (index > storePages.length - 1) {
      index = 0;
    }
  }
  if (eventTarget.classList.contains('prev-btn')) {
    index--;
    if (index < 0) {
      index = storePages.length - 1;
    }
  }
  setupUI();
}
btnContainer.addEventListener('click', paginationBtnHandler);

function displayPagination(store: Product[]): void {
  storePages = paginate(store);
  setupUI();
}

export { displayPagination };
