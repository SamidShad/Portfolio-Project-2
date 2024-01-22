import React from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import styles from "@/styles/BlogSlug.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

function BlogSlug({ blogPosts }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_KEY,
    dataset: "production",
  });

  const router = useRouter();
  const pageSlug = router.query.BlogSlug;

  const filteredBlog = blogPosts.filter((value) => {
    return value.slug.current === pageSlug;
  });

  return (
    <>
      <section>
        <div className={styles.blogpage_area}>
          <div className={styles.blogpage_container}>
            {filteredBlog.map((value, index) => {
              let pubDate = new Date(value.publishedAt);
              let year = pubDate.getFullYear() % 100;
              let month = pubDate.getMonth() + 1;
              let day = pubDate.getDate();

              let formattedDateString = `${day}/${month}/${year}`;
              return (
                <div key={index}>
                  <div className={styles.show_writer_bar}>
                    <Link
                      href={`/Components/AuthorSlider/${value.author.slug.current}`}
                    >
                      <div className={styles.writer_profile}>
                        <img
                          src={builder
                            .image(value.author.image.asset._ref)
                            .url()}
                          alt="BlogImage"
                        />
                        <h1>{value.author.name}</h1>
                      </div>
                    </Link>
                    <h1 className={styles.pub_date}>
                      Date: {formattedDateString}
                    </h1>
                  </div>
                  <img
                    src={builder.image(value.mainImage.asset._ref).url()}
                    className={styles.blogPage_image}
                    alt="Blog_image"
                  />
                  <div className={styles.blog_text_container}>
                    <span>{value.categories.title}</span>
                    <h1>{value.title}</h1>
                  </div>
                </div>
              );
            })}

            {filteredBlog[0].body.map((value, index) => {
              console.log(value.children);
              return (
                <>
                  {value.children.map((value, index) => {
                    return (
                      <div key={index} className={styles.blog_text_container}>
                        <p>{value.text}</p>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogSlug;

export async function getServerSideProps() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_KEY,
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });

  const query = `*[_type == "post"] {
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

  const blogPosts = await client.fetch(query);

  return {
    props: {
      blogPosts,
    },
  };
}
