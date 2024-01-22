import React, { useState } from "react";
import styles from "@/styles/Blogs.module.css";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

function Blogs({ blogPosts, searchText }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_KEY,
    dataset: "production",
  });
  let [categories, setCategories] = useState("all");

  const filteredBlogs = blogPosts.filter((value) => {
    const isCategoryMatch =
      categories === "all" ||
      (value.categories != null && value.categories.title === categories);

    const isSearchMatch =
      searchText === "" ||
      value.title.toLowerCase().includes(searchText.toLowerCase()) ||
      value.body[0].children[0].text
        .toLowerCase()
        .includes(searchText.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  return (
    <>
      <section>
        <div className={styles.area}>
          <div className={styles.container}>
            <div className={styles.category_area}>
              <div className={styles.category_bar}>
                <ul>
                  <li onClick={() => setCategories("all")}>All</li>
                  <li onClick={() => setCategories("technology")}>
                    Technology
                  </li>
                  <li onClick={() => setCategories("space")}>Space</li>
                  <li onClick={() => setCategories("stocks")}>Stocks</li>
                  <li onClick={() => setCategories("crypto")}>Crypto</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.area}>
          <div className={styles.blogs_container}>
            <h1>{categories} Blogs</h1>
            <div className={styles.show_blogs_container}>
              {filteredBlogs.map((value, index) => {
                let blogSlug = value.slug.current;
                let blogImage = value.mainImage.asset._ref;
                let categories =
                  value.categories && value.categories.title
                    ? value.categories.title
                    : "none";
                let title = value.title;
                let blogDesc = value.body[0].children[0].text;
                let authImage =
                  value.author &&
                  value.author.image &&
                  value.author.image.asset &&
                  value.author.image.asset._ref
                    ? builder.image(value.author.image.asset._ref).url()
                    : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
                let authorName = value.author.name;
                let pubDate = new Date(value.publishedAt);
                let year = pubDate.getFullYear() % 100;
                let month = pubDate.getMonth() + 1;
                let day = pubDate.getDate();
                let formattedDateString = `${day}/${month}/${year}`;
                let authorSlug =
                  value.author && value.author.slug && value.author.slug.current
                    ? value.author.slug.current
                    : authorName;
                return (
                  <div className="card" key={index}>
                    <div className="card__header">
                      <img
                        src={builder.image(blogImage).url()}
                        alt={title}
                        className="card__image"
                        width="600"
                      />
                    </div>
                    <div className="card__body">
                      <span className="tag tag-blue">{categories}</span>
                      <Link href={`/Components/Blogs/${blogSlug}`}>
                        <h4>{title.slice(0, 50)}</h4>
                        <p>{blogDesc.slice(0, 120)}...</p>
                      </Link>
                    </div>
                    <div className="card__footer">
                      <Link href={`/Components/AuthorSlider/${authorSlug}`}>
                        <div className="user">
                          <img
                            src={authImage}
                            alt={authorName}
                            className="user__image"
                          />
                          <div className="user__info">
                            <h5>{authorName ? authorName : "Unkown"}</h5>
                            <small>{formattedDateString}</small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blogs;

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
