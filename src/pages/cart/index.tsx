import { CartItemsList } from "@/components/Cart/CartItemsList";
import { useCart } from "@/providers/CartProvider";
import { formatPrice } from "@/utils/text-utils";

const CartPage = () => {
  const { totalPrice, cartItemsCount } = useCart();

  if (cartItemsCount === 0) {
    //TODO: Show better empty cart page https://fake-jira-issue-link.com
    return <h1>Your cart is empty</h1>;
  }

  return (
    <>
      <h1>Cart</h1>
      <h2>Total price: {formatPrice(totalPrice)}</h2>
      <CartItemsList />
    </>
  );
};

export default CartPage;
