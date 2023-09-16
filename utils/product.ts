export type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  quantity: string;
};

export const getProduct = async (): Promise<Product[]> => {
  const res = await fetch('/api/products');
  const data = await res.json();
  console.log(data);
  return data;
};
