import display from '../displayProducts';
import displayButtons from './displayButtons';
import paginate from './paginate';
import { getElement } from '../utils';
import { Product } from '../dataModel';

// Display the UI: button in sync of products from store
// Use an index to keep track of active page
// Logic for page clicks and next-prev buttons
const btnContainer = document.querySelector('.btn-container') as HTMLElement;
let index: number = 0;
let storePages: Product[][] = []; // array of product arrays

function setupUI(): void {
  display(storePages[index], getElement('.products-container'));
  displayButtons(btnContainer, storePages, index); // pass in the index to check active button UI
}

// Every time the button is clicked, change the index, and regenerate the UI. This event handler can also be written as an anonymous function. Function declaration is used for clarity only.
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

// function to display pagination given an input product array
function displayPagination(store: Product[]): void {
  storePages = paginate(store);
  setupUI();
}

// reset Index for each filtering event, otherwise, index is hang at previous values when filtering, which causes storePages[index] become undefined and exception occurs
function resetIndex(): void {
  index = 0;
}

export { displayPagination, resetIndex };
