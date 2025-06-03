interface ProductRaw {
  id: number;
  price: number;
  brand: string;
  category: string;
  description: string;
  images: string[];
  title: string;
  sku: string;
  thumbnail: string;
}

interface Product {
  id: number;
  price: number;
  brand: string;
  category: string;
  description: string;
  image: string;
  name: string;
  sku: string;
  thumbnail: string;
}

interface ResponseJSON {
  products: ProductRaw[];
}
export { ProductRaw, Product, ResponseJSON };
