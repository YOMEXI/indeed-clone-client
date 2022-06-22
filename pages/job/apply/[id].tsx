import { FormEvent, useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { toast } from "react-toastify";
import { SMTPClient } from "emailjs";
import { useAppSelector } from "../../../Components/Layout/redux/reduxHooks";
import { useRouter } from "next/router";
import { Loader } from "../../../Components/utils/Loader";

const Apply = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state.auth);

  const [cv, setCv] = useState("");
  const [loading, setloading] = useState(false);

  const jobId = router.query.id;

  let form = new FormData(this);

  const fileUpload = (e: any) => {
    const file = e.target.files[0];
    setCv(file);
  };

  //

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //
    if (!user) toast.error("unauthorized Please login");
    //
    form.set("cv", cv);
    setloading(true);
    const { data } = await axios.post(`/api/job/apply/${jobId}`, form);
    setloading(false);
    form.set("cv", "");
    setTimeout(() => {
      router.push("/");
    }, 3000);
    toast.success(data.msg);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col className="d-flex justify-content-center align-items-center flex-column gap-5">
          <h3>
            Welcome {user?.user?.firstname} <br /> Upload Your cv
          </h3>
          {loading && <Loader />}
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload cv</Form.Label>

                <Form.Control
                  type="file"
                  name="message"
                  onChange={fileUpload}
                />
              </Form.Group>
              <Button type="submit" disabled={!user}>
                Submit
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Apply;
