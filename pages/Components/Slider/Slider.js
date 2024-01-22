import React from "react";
import styles from "@/styles/Slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";

function Slider() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Swiper
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            effect={"fade"}
            modules={[EffectFade, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide className={styles.sliders}>
              <div className={styles.slider_container}>
                <div className={styles.text_box}>
                  <p>TheBlogist</p>
                  <h1>Your Go-To Source for Quality Content</h1>
                  <p>
                    Uncover curated excellence. Your go-to for diverse,
                    high-quality content. Informative, entertaining, and
                    inspiring. Explore now for a premium experience!
                  </p>
                  <Link href="/Components/Blogs/Blogs">
                    <button className={`button ${styles.slider_btn}`}>
                      <span className="button-content">Get Started</span>
                    </button>
                  </Link>
                </div>
                <div>
                  <img
                    src="/logo.png"
                    className={styles.slider_image}
                    alt="heroImage"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.sliders}>
              <div className={styles.slider_container}>
                <div className={styles.text_box}>
                  <p>TheBlogist</p>
                  <h1>Empowering Minds Through Engaging Content</h1>
                  <p>
                    At TheBlogist, we strive to deliver insightful and
                    thought-provoking content that caters to a diverse audience.
                    Our mission is to provide a platform for meaningful
                    discussions and sharing valuable knowledge.
                  </p>
                  <Link href="/Components/Blogs/Blogs">
                    <button className={`button ${styles.slider_btn}`}>
                      <span className="button-content">Get Started</span>
                    </button>
                  </Link>
                </div>
                <div>
                  <img
                    src="/logo.png"
                    className={styles.slider_image}
                    alt="heroImage"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.sliders}>
              <div className={styles.slider_container}>
                <div className={styles.text_box}>
                  <p>TheBlogist</p>
                  <h1>Explore the Depths of Knowledge</h1>
                  <p>
                    Dive deep into the ocean of knowledge with our
                    thought-provoking articles. We believe in providing content
                    that not only informs but also inspires. Let your curiosity
                    guide you as you explore the diverse and fascinating world
                    of ideas.
                  </p>
                  <Link href="/Components/Blogs/Blogs">
                    <button className={`button ${styles.slider_btn}`}>
                      <span className="button-content">Get Started</span>
                    </button>
                  </Link>
                </div>
                <div>
                  <img
                    src="/logo.png"
                    className={styles.slider_image}
                    alt="heroImage"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </header>
    </>
  );
}

export default Slider;
