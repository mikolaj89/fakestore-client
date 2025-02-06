import styles from "../styles/layout.module.scss";
import { CategoryName } from "@/types/types";
import { CategoriesList } from "@/components/Category/CategoriesList";
import { getCategories } from "@/apis/fakestore-api";

export const getServerSideProps = async () => {
  const categories = await getCategories();
  return { props: { categories } };
};

export default function Home({ categories }: { categories: CategoryName[] }) {
  return (
    <>
      <h1 className={styles.title}>Welcome to FakeStore</h1>
      <h2>Available categories: </h2>
      <CategoriesList categories={categories} />
    </>
  );
}
