import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaMoon } from "react-icons/fa";
import { RiMenu5Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Navbar({ searchText, setSearchText }) {
  const [states, setStates] = useState({
    menu: false,
    searchBar: false,
  });

  const { menu, searchBar } = states;

  function menuFunc() {
    setStates({
      ...states,
      menu: !menu,
    });
  }

  function searchOCFunc() {
    setStates({
      ...states,
      searchBar: !searchBar,
    });
  }

  function dlMode() {
    document.querySelector("body").classList.toggle("dark_theme");
  }

  function searchFunc(e) {
    const inputValue = e.target.value;
    setSearchText(inputValue);
  }

  return (
    <>
      <div
        className={`${styles.nav_search_bar_container} ${
          searchBar && styles.nav_search_bar_active
        }`}
      >
        <input
          type="text"
          value={searchText}
          onChange={searchFunc}
          name="usersearch"
          placeholder="Search..."
        />
        <RxCross2
          onClick={searchOCFunc}
          className={styles.search_bar_close_icon}
        />
      </div>
      <nav className={styles.navbar}>
        <RiMenu5Fill onClick={menuFunc} className={styles.navbar_menu_icon} />
        <Link href="/">
          <h1>TheBlogist</h1>
        </Link>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/Components/Blogs/Blogs">
            <li>Blogs</li>
          </Link>
          <Link href="/Components/Pricing/Pricing">
            <li>Pricing</li>
          </Link>
          <Link href="/Components/Contact/Contact">
            <li>Contact</li>
          </Link>
        </ul>
        <div className={styles.navbar_icons_container}>
          <Link href="/Components/Blogs/Blogs">
            <FaSearch onClick={searchOCFunc} className={styles.nav_icon} />
          </Link>
          <FaMoon onClick={dlMode} className={styles.nav_icon} />
        </div>
      </nav>
      <div
        className={`${styles.nav_drawer} ${menu && styles.nav_drawer_active}`}
      >
        <div className={styles.drawer_header}>
          <h1>TheBlogist</h1>
          <RxCross2 onClick={menuFunc} className={styles.drawer_close_icon} />
        </div>
        <ul className={styles.drawer_links}>
          <ul>
            <Link href="/">
              <li onClick={menuFunc}>Home</li>
            </Link>
            <Link href="/Components/Blogs/Blogs">
              <li onClick={menuFunc}>Blogs</li>
            </Link>
            <Link href="/Components/Pricing/Pricing">
              <li onClick={menuFunc}>Pricing</li>
            </Link>
            <Link href="/Components/Contact/Contact">
              <li onClick={menuFunc}>Contact</li>
            </Link>
          </ul>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
