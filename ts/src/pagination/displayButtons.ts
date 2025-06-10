import { Product } from '../dataModel';

// function to display buttons based on the number of pages
function displayButtons(
  container: HTMLElement,
  pages: Product[][],
  activeIndex: number,
): void {
  // button array that matches the size of the array of array data
  const btns: string[] = pages.map((_, pageIndex) => {
    return `<button class="page-btn ${
      activeIndex === pageIndex ? 'active-btn' : 'null'
    }" data-index="${pageIndex}">${pageIndex + 1}</button>`;
  });
  btns.push('<button class="next-btn">next</button>');
  btns.unshift('<button class="prev-btn">prev</button>');
  container.innerHTML = btns.join('');
}

export default displayButtons;
