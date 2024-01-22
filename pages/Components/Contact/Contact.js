import React from "react";
import styles from "@/styles/Contact.module.css";
import Link from "next/link";

function Contact() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contact_card}>
          <h1>Contact Us</h1>
          <form method="POST">
            <div className={styles.txt_field}>
              <input type="text" name="name" id="name" required />
              <span></span>
              <label>Full Name</label>
            </div>

            <div className={styles.txt_field}>
              <input type="text" name="email" id="email" required />
              <span></span>
              <label>Email</label>
            </div>

            <div className={styles.txt_field}>
              <input type="text" name="message" id="message" required />
              <span></span>
              <label>Message</label>
            </div>

            <div className={styles.txt_field}>
              <input type="text" name="package" id="package" required />
              <span></span>
              <label>Package</label>
            </div>

            <div>
              <button
                type="reset"
                className={`button ${styles.contact_reset_btn}`}
              >
                <span className="button-content">Reset</span>
              </button>
            </div>

            <button
              type="submit"
              className={`button ${styles.contact_send_btn}`}
            >
              <span className="button-content">Send</span>
            </button>
            <input type="hidden" name="_template" value="table" />

            <div className={styles.homePage_link}>
              <Link href="/">Back to Home page</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
