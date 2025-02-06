import { calculateTotalPrice } from "@/components/Cart/cart-helper";
import { CartItem, CategoryProduct } from "@/types/types";

import { createContext, useContext, useEffect, useState } from "react";

type CartState = {
  cartItems: CartItem[];
  addToCart: (product: CategoryProduct, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  totalPrice: number;
  cartItemsCount: number;
  updateQuantity: (productId: number, quantity: number) => void;
};

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  cartItemsCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
};

const CartContext = createContext<CartState | null>(initialState);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    // get cartItems from localStorage - since fakestore api doesn't save cart items, 
    // we use localStorage to persist cart items
    // in real life scenario, we would fetch cart items from BE and then populate the cartItems state
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  useEffect(() => {
    
    // both calculations should ideally be done in the backend and returned in the response (on every cart update), 
    // but since fakestore api doesn't save cart items, we use local calculations
    const totalPrice = calculateTotalPrice(cartItems);
    const cartItemsCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartItemsCount(cartItemsCount);
    setTotalPrice(totalPrice);
    // update in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CategoryProduct, quantity: number) => {
    // in real life scenario, in order to add product to cart, we would make an API call first
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + quantity);
      return;
    }
    setCartItems([...cartItems, { ...product, quantity }]);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    // real life scenario - in order to update product quantity in cart, we would make an API call first
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    // in real life scenario, to remove product from cart,  we would make an API call first
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        cartItemsCount,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
