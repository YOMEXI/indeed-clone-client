import React from "react";
import { Col, Row } from "react-bootstrap";
import SideCard from "../../Components/Layout/cards/SideCard";

const SingleJob = () => {
  return (
    <Row className="mt-5 d-flex justify-content-center align-items-center">
      <Col lg={8} md={10} sm={11} xs={11}>
        <SideCard />
      </Col>
    </Row>
  );
};

export default SingleJob;
