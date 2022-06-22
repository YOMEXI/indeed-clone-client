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
import {
  useAppDispatch,
  useAppSelector,
} from "../../Components/Layout/redux/reduxHooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { login } from "../../Components/Layout/redux/auth/authActions";
import { Loader } from "../../Components/utils/Loader";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.user) router.push("/");
  }, [router]);

  //
  const initialValues = {
    email: "",
    password: "",
  };
  //

  //
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(7, "Must be 7 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  //

  //

  const onSubmit = (values: any, onSubmitProps: any) => {
    dispatch(login(values, router));
    onSubmitProps.resetForm();
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
                    <h2 className={styles.homeBoxh1}>Welcome, Please Login</h2>
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
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="@"
                        className="form-control my-3"
                      />

                      <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder=""
                        className="form-control my-3"
                      />

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

export default Login;
