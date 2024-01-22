import Slider from "./Components/Slider/Slider";
import ShowPosts from "./Components/AuthorSlider/AuthorSlider";
import { createClient } from "next-sanity";
import BlogSlider from "./Components/BlogSlider/BlogSlider";
import Loader from "./Components/Loader/Loader";

export default function App({ authors, blogPosts }) {
  return (
    <>
      <Loader />
      <Slider />
      <ShowPosts authors={authors} />
      <BlogSlider blogPosts={blogPosts} />
    </>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    projectId: "kx8e43ul",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });

  const qurey1 = `*[_type == "author"]`;
  const qurey2 = `*[_type == "post"][0..4] {
    title,
    mainImage,
    publishedAt,
    body,
    categories[0]->{title},
    author->{name,slug,image},
    slug,
    _id,
    _rev,
    _type,
    _createdAt,
    _updatedAt
  }`;

  const authors = await client.fetch(qurey1);
  const blogPosts = await client.fetch(qurey2);

  return {
    props: {
      authors,
      blogPosts,
    },
  };
}
