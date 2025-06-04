// global imports for functionality in index/products/product/about page
import '../toggleSidebar';
import '../cart/toggleCart';
// import '../cart/setupCart';

// specific
import { addToCart } from '../cart/setupCart';
import { singleProductUrl, getElement, formatPrice } from '../utils';

// DOM element selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const magnifyADOM = getElement('.magnify-anchor') as HTMLAnchorElement;
const imgDOM = getElement('.single-product-img') as HTMLImageElement;
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const skuDOM = getElement('.single-product-sku');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// show product when page loads
window.addEventListener('DOMContentLoaded', async () => {
  // get the query string from the product-page URL (e.g., ?id=1)
  const queryString = window.location.search;
  // create a URLSearchParams object
  const urlParams = new URLSearchParams(queryString);
  // get the value of the "id" parameter
  const productId = urlParams.get('id');
  // construct single product link
  const productUrl = singleProductUrl + productId;
  // fetch and display a single product
  try {
    const response = await fetch(productUrl);
    // process a failed request
    if (!response.ok) {
      centerDOM.innerHTML = `
      <div>
      <h3 class="error"> sorry, something went wrong</h3>
      <a href="index.html" class="btn">back home</a>
      </div>
      `;
      throw new Error(
        `fail to fetch the data, response status ${response.status}`,
      );
    }
    const product = await response.json();
    // grab data from the product
    let {
      id,
      title: name,
      price,
      brand,
      sku,
      images,
      thumbnail,
      description,
    } = product;
    const image = images[0];
    price = Math.ceil(price * 100); // convert price to cents
    // set values to html elements
    document.title = `${name.toUpperCase()}|Aesthetik`;
    pageTitleDOM.textContent = `A closer look at ${name}`;
    magnifyADOM.href = image;
    imgDOM.src = thumbnail;
    titleDOM.textContent = name;
    companyDOM.textContent = brand ? `by ${brand}` : `by DummyJSON`;
    priceDOM.textContent = `${formatPrice(price)}`;
    descDOM.textContent = description;
    skuDOM.textContent = `SKU: ${sku}`;
    // add click event to the add-to-cart button
    cartBtn.addEventListener('click', () => addToCart(id.toString()));
  } catch (err) {
    console.log(err);
  }
  // hide loading screen after loaded
  loading.style.display = 'none';

  // After DOM content is loaded, initialize magnify
  $(document).ready(function () {
    $('.zoom').magnify();
  });
});
