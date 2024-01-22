import React from "react";
import styles from "@/styles/Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footer}>
          <div className={styles.row}>
            <Link href="#">
              <FaFacebook className={styles.footer_icons} />
            </Link>
            <Link href="#">
              <FaInstagram className={styles.footer_icons} />
            </Link>
            <Link href="#">
              <FaLinkedin className={styles.footer_icons} />
            </Link>
            <Link href="#">
              <FaTwitter className={styles.footer_icons} />
            </Link>
          </div>

          <div className={styles.row}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/Components/Blogs/Blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/Components/Pricing/Pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/Components/Contact/Contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className={styles.row}>
            TheBlogist Copyright © 2021 Inferno - All rights reserved ||
            Designed By: Samid
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
