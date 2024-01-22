import React from "react";
import styles from "@/styles/Pricing.module.css";
import { FaDollarSign } from "react-icons/fa";
import Link from "next/link";
function Pricing() {
  return (
    <>
      <section className={styles.pricing_tabel}>
        <div className={styles.area}>
          <h1>Our Pricing</h1>
          <div className={styles.container}>
            <div className={styles.cards}>
              <div className={`${styles.card} ${styles.shadow}`}>
                <ul>
                  <li className={styles.pack}>Free</li>
                  <li
                    id="basic"
                    className={`${styles.price} ${styles.bottom_bar}`}
                  >
                    <FaDollarSign />
                    000.00
                  </li>
                  <li className={styles.bottom_bar}>Limited access</li>
                  <li className={styles.bottom_bar}>4 Categories</li>
                  <li className={styles.bottom_bar}>Ad-supported</li>
                  <li>
                    <Link href="/Components/Blogs/Blogs">
                      <button className={`button ${styles.slider_btn}`}>
                        <span className="button-content">GET</span>
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={`${styles.card} ${styles.active}`}>
                <ul>
                  <li className={styles.pack}>Premium</li>
                  <li
                    id="professional"
                    className={`${styles.price} ${styles.bottom_bar}`}
                  >
                    <FaDollarSign />
                    199.99
                  </li>
                  <li className={styles.bottom_bar}>10 Categories</li>
                  <li className={styles.bottom_bar}>Advanced features</li>
                  <li className={styles.bottom_bar}>No advertisements</li>
                  <li className={styles.bottom_bar}>
                    Access to premium contents
                  </li>
                  <li>
                    <Link href="/Components/Contact/Contact">
                      <button className={`button ${styles.slider_btn}`}>
                        <span className="button-content">Purchase</span>
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={`${styles.card} ${styles.shadow}`}>
                <ul>
                  <li className={styles.pack}>Master</li>
                  <li
                    id="master"
                    className={`${styles.price} ${styles.bottom_bar}`}
                  >
                    <FaDollarSign />
                    399.99
                  </li>
                  <li className={styles.bottom_bar}>25 Categories</li>
                  <li className={styles.bottom_bar}>Advanced features</li>
                  <li className={styles.bottom_bar}>No advertisements</li>
                  <li className={styles.bottom_bar}>
                    Access to premium contents
                  </li>
                  <li className={styles.bottom_bar}>
                    Premium customer support (24/7)
                  </li>
                  <li className={styles.bottom_bar}>
                    Enhanced performance and speed
                  </li>
                  <li>
                    <Link href="/Components/Contact/Contact">
                      <button className={`button ${styles.slider_btn}`}>
                        <span className="button-content">Purchase</span>
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;
