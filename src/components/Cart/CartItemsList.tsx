import { formatPrice } from "@/utils/text-utils";
import { useCart } from "@/providers/CartProvider";
import Image from "next/image";
import styles from "./CartItemsList.module.scss";
import { ChangeEvent } from "react";
import { CartItem as CartItemType } from "@/types/types";

type CartItemProps = {
  product: CartItemType;
  onQuantityChange: (
    productId: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onDelete: (productId: number) => void;
};

const CartItem = ({
  product,
  onQuantityChange,
  onDelete,
}: CartItemProps) => {
  return (
    <li className={styles.cartProduct} key={product.id}>
      <Image src={product.image} alt={product.title} width={50} height={50} />
      <div>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.price}>{formatPrice(parseInt(product.price))}</p>
      </div>
      <div className={styles.options}>
        <div>
          <input
            onChange={(e) => onQuantityChange(product.id, e)}
            type="number"
            value={product.quantity}
          />

          <button onClick={() => onDelete(product.id)}>Remove</button>
        </div>
      </div>
    </li>
  );
};

export const CartItemsList = () => {
  const cartState = useCart();
  const { cartItems, updateQuantity, removeFromCart } = cartState;

  const onQuantityChange = (
    productId: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // adjust to accept  backspace when clearing one digit value https://fake-jira-issue-link.com
    if(e.target.value === '' || isNaN(parseInt(e.target.value))) {
      return;
    } 

    const quantity = parseInt(e.target.value);
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    updateQuantity(productId, quantity);
  };

  const onDelete = (productId: number) => {
    //TODO:  add confirmation dialog here https://fake-jira-issue-link.com
    removeFromCart(productId);
  };

  return (
    <ul>
      {cartItems.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          onQuantityChange={onQuantityChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
