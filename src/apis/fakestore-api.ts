import { CategoryName, CategoryProduct } from "@/types/types";


export const addToCartPOST = async (productId: number, quantity: number) => {
  const response = await fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1, // example ID, since we don't have user session management
      date: new Date().toISOString().split("T")[0], // Current date
      products: [{ productId, quantity }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync cart with API");
  }

  const data = await response.json(); // Assume useful data in a real scenario. Here we don't use it anyway, so no type casting
  return data;
};

export const getCategoryItems = async (
  categoryName: string
): Promise<CategoryProduct[]> => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${categoryName}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch category items for ${categoryName}`);
  }

  return (await response.json()) as CategoryProduct[];
};

export const getCategories = async (): Promise<CategoryName[]> => {
  const response = await fetch("https://fakestoreapi.com/products/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return (await response.json()) as CategoryName[];
};
