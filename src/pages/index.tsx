import { CategoryName } from "@/types/types";
import { CategoriesList } from "@/components/Category/CategoriesList";
import { getCategories } from "@/apis/fakestore-api";

export const getServerSideProps = async () => {
  let categories: CategoryName[];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }

  return { props: { categories } };
};

/* that's the main page of the app */
export default function Home({ categories }: { categories: CategoryName[] }) {
  return (
    <>
      <h1 className="title">Welcome to FakeStore</h1>
      <h2>Available categories: </h2>
      <CategoriesList categories={categories} />
    </>
  );
}
