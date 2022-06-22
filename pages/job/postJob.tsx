import React, { ChangeEvent, useState, FormEvent } from "react";
import Editor from "../../Components/Form/Editor";
import styles from "./postJob.module.css";

//
import parse from "html-react-parser";
import { Form, Col, Row, Container, FormSelect, Button } from "react-bootstrap";
import { useAppSelector } from "../../Components/Layout/redux/reduxHooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { jobFormValidation, Loader } from "../../Components/utils/Loader";
import axios from "axios";

const PostJob = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state.auth);
  //
  const options = [
    { value: "", text: "--Select Job Category--" },
    { value: "finance", text: "Finance" },
    { value: "informationtechnology", text: "Information Technology" },
    { value: "customerservice", text: "Customer Service/Sales" },
  ];

  const experience = [
    { value: "", text: "--Select Experience Level--" },
    { value: "entrylevel", text: "Entry Level" },
    { value: "1to3years", text: "1 - 3 years" },
    { value: "Above4years", text: "Above 4 years" },
  ];

  const [category, setCategory] = useState(options[0].value);
  const [exp, setExp] = useState(experience[0].value);
  const [description, setDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const form = new FormData(this);

  //
  const handleCatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleExpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExp(event.target.value);
  };

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast.error("Unauthorized");

    jobFormValidation(companyName, jobTitle, description, exp, category);
    const validatedJob = jobFormValidation(
      companyName,
      jobTitle,
      description,
      exp,
      category
    );
    form.set("companyname", companyName);
    form.set("jobtitle", jobTitle);
    form.set("exp", exp);
    form.set("category", category);
    form.set("location", location);
    form.set("description", description);
    if (validatedJob) {
      setLoading(true);
      const { data } = await axios.post("/api/job/create", form);
      setLoading(false);
      toast.success(data.msg);
      if (data.msg) {
        setTimeout(() => {
          router.back();
        }, 3000);
      }
    }
  };

  //
  return (
    <Container>
      <Form onSubmit={Submit}>
        <Row className={styles.postJobContainer}>
          {loading && <Loader />}
          <Col lg={9} md={10} sm={12} xs={12} className={styles.postJobBox}>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setJobTitle(e.target.value)
              }
            />

            <Form.Label className="my-3">Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
            />

            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <FormSelect
              aria-label="Default select example"
              value={category}
              onChange={handleCatChange}
              className="my-4"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              aria-label="Default select example"
              value={exp}
              onChange={handleExpChange}
              className="my-4"
            >
              {experience.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </FormSelect>
            <Form.Label className="my-2">Job Description</Form.Label>
            <Editor setDescription={setDescription} />
            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PostJob;
