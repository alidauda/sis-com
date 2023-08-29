export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

export const getProduct = async (): Promise<Product[]> => {
  const res = await fetch('/api/products');
  const data = await res.json();
  console.log(data);
  return data;
};
