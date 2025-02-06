export type CategoryName = string;

export type CategoryProduct = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  };

  export type CartItem = {
    id: number;
    quantity: number;
    title: string;
    price: string;
    image: string;
};

  export type Cart = {
    cartItems: CategoryProduct[];
    quantity: number;
}