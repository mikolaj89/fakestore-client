import { CartItem } from "@/types/types";

export const calculateTotalPrice = (cartItems: CartItem[]) =>
  cartItems.reduce(
    (total, item) => total + parseInt(item.price) * item.quantity,
    0
  );
