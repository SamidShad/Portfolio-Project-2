import React from "react";
import { createClient } from "next-sanity";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import styles from "@/styles/AuthorSlug.module.css";
import Link from "next/link";

function AuthorSlug({ blogPosts, authors }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_KEY,
    dataset: "production",
  });

  const router = useRouter();
  const userSlug = router.query.AuthorSlug;

  const filteredAuthors = authors.filter((author) => {
    return author.slug.current === userSlug;
  });

  const filteredBlogs = blogPosts.filter((blog) => {
    return blog.author.slug.current === userSlug;
  });

  return (
    <>
      {filteredAuthors.map((author, index) => (
        <div key={index}>
          <div className={styles.algn}>
            <div className={styles.card}>
              <div className={styles.upper_bg}>
                <img
                  src={builder.image(author.image.asset._ref).url()}
                  alt={author.name}
                  className={styles.profile_pic}
                />
              </div>
              <div className={styles.lower_bg}>
                <div className={styles.text}>
                  <p className={styles.name}>{author.name}</p>
                  <p className={styles.desc}>
                    {author.bio[0].children[0].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h1 className={styles.author_post_name}>
        {filteredBlogs[0].author.name} Posts
      </h1>
      <div className={styles.author_blogs_area}>
        <div className={styles.container}>
          {filteredBlogs &&
            filteredBlogs.map((value, index) => {
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
                <div key={index} className="card">
                  <div className="card__header">
                    <img
                      src={builder.image(blogImage).url()}
                      alt="card__image"
                      className="card__image"
                      width="600"
                    />
                  </div>
                  <Link href={`/Components/Blogs/${value.slug.current}`}>
                    <div className="card__body">
                      <span className="tag tag-blue">{categories}</span>
                      <h4>{title.slice(0, 50)}</h4>
                      <p>{blogDesc.slice(0, 120)}...</p>
                    </div>
                  </Link>
                  <div className="card__footer">
                    <Link href={authorSlug}>
                      <div className="user">
                        <img
                          src={authImage}
                          alt="user__image"
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
    </>
  );
}

export default AuthorSlug;

export async function getServerSideProps() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_KEY,
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });

  const query1 = `*[_type == "post"] {
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

  const query2 = `*[_type == "author"] {
    name,
    _createdAt,
    image,
    _id,
    slug,
    _rev,
    _type,
    bio,
    _updatedAt,
  }`;

  const blogPosts = await client.fetch(query1);
  const authors = await client.fetch(query2);

  return {
    props: {
      blogPosts,
      authors,
    },
  };
}
