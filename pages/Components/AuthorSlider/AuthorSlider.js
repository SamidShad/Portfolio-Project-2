import React from "react";
import styles from "@/styles/AuthorSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { breakpoints } from "./breakpoints";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css";

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_KEY,
  dataset: "production",
});

function ShowPosts({ authors }) {
  return (
    <>
      <section>
        <div className={styles.area}>
          <div className={styles.container}>
            <h1>Our Authors</h1>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={breakpoints}
              modules={[FreeMode, Autoplay]}
              freeMode={true}
              className={`mySwiper ${styles.author_slider}`}
            >
              {authors &&
                authors.reverse().map((value, index) => {
                  let authImage =
                    value.image && builder.image(value.image.asset._ref).url()
                      ? builder.image(value.image.asset._ref).url()
                      : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";

                  let authName = value.name || "Unknown";

                  let authDesc =
                    (value.bio &&
                      value.bio[0] &&
                      value.bio[0].children &&
                      value.bio[0].children[0] &&
                      value.bio[0].children[0].text) ||
                    "Author not written";

                  let slug =
                    value.slug && value.slug.current
                      ? value.slug.current
                      : "/notfound";

                  return (
                    <SwiperSlide className={styles.slides} key={index}>
                      <div className={styles.author_card}>
                        <div className={styles.profile_picture}>
                          <img src={authImage} alt={authName} />
                        </div>
                        <h2 className={styles.name}>{authName}</h2>
                        <p className={styles.description}>
                          {authDesc.slice(0, 35)}...
                        </p>
                        <Link href={`/Components/AuthorSlider/${slug}`}>
                          <button
                            className={`button ${styles.author_card_btn}`}
                          >
                            <span className="button-content">
                              Visit Profile
                            </span>
                          </button>
                        </Link>
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

export default ShowPosts;
