import { allProductsUrl } from './utils';
import { ResponseJSON } from './dataModel';

async function fetchProducts(): Promise<ResponseJSON | undefined> {
  try {
    const response = await fetch(allProductsUrl);
    if (!response.ok) {
      // If the status code is not in the successful range, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export default fetchProducts;
