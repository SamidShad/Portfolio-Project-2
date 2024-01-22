import React from "react";
import styles from "@/styles/BlogSlider.module.css";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import imageUrlBuilder from "@sanity/image-url";
import "swiper/css/free-mode";
import "swiper/css";
import { breakpoints } from "./breakpoints";
import Link from "next/link";

function BlogSlider({ blogPosts }) {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_KEY,
    dataset: "production",
  });

  return (
    <>
      <section>
        <div className={styles.area}>
          <div className={styles.container}>
            <h1>Recent Blogs</h1>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={breakpoints}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Autoplay]}
              freeMode={true}
              className="mySwiper"
            >
              {blogPosts &&
                blogPosts.map((value, index) => {
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
                    value.author &&
                    value.author.slug &&
                    value.author.slug.current
                      ? value.author.slug.current
                      : authorName;
                  return (
                    <SwiperSlide key={index} className={styles.slides}>
                      <div className={`card ${styles.slider_blog_card}`}>
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
                          <Link href={`/Components/AuthorSlider/${authorSlug}`}>
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
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogSlider;
