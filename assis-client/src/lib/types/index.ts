export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: "kg" | "unit";
};

export type CartItem = {
  product: Product;
  quantity: number;
};
