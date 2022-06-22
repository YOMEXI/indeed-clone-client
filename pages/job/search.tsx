import { useRouter } from "next/router";
import React from "react";
import Search from "../../Components/Layout/Search";

const Searchs = () => {
  const router = useRouter();

  return (
    <div>
      <Search />
    </div>
  );
};

export default Searchs;
