import { CategoryName, CategoryProduct } from "@/types/types";

export const addToCartPOST = async (productId: number, quantity: number) => {
  // 🟢 Trigger API Call (FakeStore API doesn’t persist, but this shows intent)
  try {
    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1, // example ID, since we don't have user session management
        date: new Date().toISOString().split("T")[0], // Current date
        products: [{ productId, quantity }],
      }),
    });

    if (!response.ok) throw new Error("Failed to sync cart with API");

    const data = await response.json(); // in case of real response, we can use this data to update the cart state on client side

    console.info("Cart synced with API:", data);
    return data;
  } catch (error) {
    console.error("Error syncing cart:", error);
  }
};

export const getCategoryItems = async (
  categoryName: string
): Promise<CategoryProduct[]> => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${categoryName}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return (await response.json()) as CategoryProduct[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategories = async (): Promise<CategoryName[]> => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return (await response.json()) as CategoryName[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
