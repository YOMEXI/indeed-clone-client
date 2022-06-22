import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <div className="siteContainer">
      <header>
        <NavBar />
      </header>
      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
