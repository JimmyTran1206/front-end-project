import { Product } from '../dataModel';

// Transform an input array of products into array of arrays for pagination
function paginate(products: Product[]): Product[][] {
  const itemsPerPage = 30;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);
  // create array of arrays
  const newProducts: Product[][] = Array.from(
    { length: numberOfPages },
    (_, index) => {
      const start = index * itemsPerPage;
      return products.slice(start, start + itemsPerPage);
    },
  );
  return newProducts;
}

export default paginate;
