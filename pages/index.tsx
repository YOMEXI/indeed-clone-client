import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import HomePage from "../Components/Layout/HomePage";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
