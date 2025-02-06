import { formatPrice } from "@/utils/text-utils";
import { useCart } from "@/providers/CartProvider";
import Image from "next/image";
import styles from "./CartItemsList.module.scss";
import { ChangeEvent } from "react";

export const CartItemsList = () => {
  const cartState = useCart();
  const { cartItems, updateQuantity, removeFromCart } = cartState;

  const onQuantityChange = (
    productId: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
     // handle onKeyDown to accept backspace https://fake-jira-issue-link.com
    if(e.target.value === '' || isNaN(parseInt(e.target.value))) {
      return;
    } 

    const quantity = parseInt(e.target.value);
    if(quantity === 0){
      removeFromCart(productId);
      return;
    }
    updateQuantity(productId, quantity);
  };

  const onDeleteClick = (productId: number) => {
    //TODO:  add confirmation dialog here https://fake-jira-issue-link.com
    removeFromCart(productId);
  };

  return (
    <ul>
      {cartItems.map((product) => (
        <li className={styles.cartProduct} key={product.id}>
          <Image
            src={product.image}
            alt={product.title}
            width={50}
            height={50}
          />
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

              <button onClick={() => onDeleteClick(product.id)}>
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
