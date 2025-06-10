import display from '../displayProducts.js';
import displayButtons from './displayButtons.js';
import paginate from './paginate.js';
import { getElement } from '../utils.js';
// Display the UI: button in sync of products from store
// Use an index to keep track of active page
// Logic for page clicks and next-prev buttons
const btnContainer = document.querySelector('.btn-container');
let index = 0;
let storePages = []; // array of product arrays
function setupUI() {
  display(storePages[index], getElement('.products-container'));
  displayButtons(btnContainer, storePages, index); // pass in the index to check active button UI
}
// Every time the button is clicked, change the index, and regenerate the UI
function paginationBtnHandler(e) {
  const eventTarget = e.target;
  if (eventTarget.classList.contains('btn-container')) return;
  if (eventTarget.classList.contains('page-btn')) {
    index = parseInt(eventTarget.dataset.index);
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
function displayPagination(store) {
  storePages = paginate(store);
  setupUI();
}
// reset Index for each filtering event, otherwise, index is hang at previous values when filtering, which causes storePages[index] become undefined and exception occurs
function resetIndex() {
  index = 0;
}
export { displayPagination, resetIndex };
