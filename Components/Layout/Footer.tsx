import React from "react";
import { Container, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Col className="d-flex justify-content-center align-items-center p-2 bg-dark text-white">
        <footer>
          <p>Copyright &copy; 2022 , Findeed</p>
        </footer>
      </Col>
    </>
  );
};

export default Footer;
