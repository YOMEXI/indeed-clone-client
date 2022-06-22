import { Formik, Field, useFormik, Form } from "formik";
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Image,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";

import * as Yup from "yup";
//
import styles from "./Auth.module.css";
import { MyTextInput } from "../../Components/Form/inputComponent";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Components/Layout/redux/reduxHooks";
import { register } from "../../Components/Layout/redux/auth/authActions";
import { useRouter } from "next/router";
import { Loader } from "../../Components/utils/Loader";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.user) router.push("/");
  }, [router]);
  //
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    age: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    password: Yup.string()
      .min(7, "Must be 7 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    location: Yup.string()
      .min(2, "Must be 2 characters or more")
      .required("Required"),
    age: Yup.number().required("Required"),
  });

  const [image, setImage] = useState("");

  let form = new FormData(this);

  //
  const imageUpload = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const options = [
    { value: "", text: "--Select your status--" },
    { value: "recruiter", text: "Recruiter" },
    { value: "applicant", text: "Applicant" },
  ];

  const [status, setStatus] = useState(options[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  //

  const onSubmit = (values: any, onSubmitProps: any) => {
    const { firstName, lastName, email, password, location, age } = values;
    form.set("firstName", firstName);
    form.set("lastName", lastName);
    form.set("email", email);
    form.set("password", password);
    form.set("location", location);
    form.set("age", age);
    form.set("image", image);
    form.set("status", status);
    dispatch(register(form, router));
    onSubmitProps.resetForm();

    // for (let [key, value] of form.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          {isLoading && <Loader />}
          <Col>
            <Container>
              <Row className={styles.homePageContainer}>
                <Col
                  xxl={5}
                  lg={5}
                  md={5}
                  sm={10}
                  xs={10}
                  className="d-flex justify-content-center align-items-center text-white"
                >
                  <div>
                    <Image
                      src="/img/home1.jpg"
                      fluid
                      className={styles.homeJobImg}
                    />
                    <h2 className={styles.homeBoxh1}>Find Your Dream Job</h2>
                  </div>
                </Col>
                <Col xxl={5} lg={5} md={7} sm={12} xs={12} className="">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    <Form>
                      <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        className="form-control my-3"
                      />
                      <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        className="form-control my-3"
                      />
                      <MyTextInput
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="@"
                        className="form-control my-3"
                      />
                      <MyTextInput
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="Location"
                        className="form-control my-3"
                      />
                      <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="*******"
                        className="form-control my-3"
                      />
                      <MyTextInput
                        label="Age"
                        name="age"
                        type="number"
                        placeholder="Age"
                        className="form-control my-3"
                      />
                      <FormLabel>Status</FormLabel>
                      <FormSelect
                        aria-label="Default select example"
                        value={status}
                        onChange={handleChange}
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </FormSelect>
                      <FormGroup controlId="formFile" className="mb-3">
                        <FormLabel>Image Upload</FormLabel>
                        <FormControl type="file" onChange={imageUpload} />
                      </FormGroup>

                      <Button type="submit">Submit</Button>
                    </Form>
                  </Formik>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
