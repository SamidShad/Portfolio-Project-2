import React, { useEffect, useState } from "react";
import styles from "@/styles/Loader.module.css";
import { PulseLoader } from "react-spinners";

function Loader() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(false);
  }, []);
  return (
    <>
      {loader && (
        <div className={styles.loader_container}>
          <PulseLoader color="#56ccf2" />
        </div>
      )}
    </>
  );
}

export default Loader;
