import { CategoryName } from "@/types/types";
import { CategoriesList } from "@/components/Category/CategoriesList";
import { getCategories } from "@/apis/fakestore-api";
import Head from "next/head";

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
      <Head>
        <title>FakeStore - some welcome title here</title>
        <meta name="description" content="Some welcome description here" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FakeStore - some title here" />
        <meta
          property="og:description"
          content="Some welcome description here"
        />
        <meta property="og:type" content="website" />
      </Head>

      <header>
        <h1 className="title">Welcome to FakeStore</h1>
      </header>
      <section>
        <h2>Available categories: </h2>
        <CategoriesList categories={categories} />
      </section>
    </>
  );
}
