import axios from "axios";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import styles from "./Loader.module.css";
import { jobTypes } from "../Types/jobTypes";

export const Loader = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Spinner animation="border" role="status" />

      <span className="">Loading...</span>
    </div>
  );
};

export const OtherLoader = () => {
  return (
    <div className={styles.ldsFacebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const logout = async () => {
  const res = await axios.get(`/api/user/logout`);

  if (res) {
    toast.success(res.data.msg);
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2000);
  }
};

export const jobFormValidation = (
  companyName: string,
  jobTitle: string,
  description: string,
  exp: string,
  category: string
) => {
  if (jobTitle === "" || jobTitle.length < 2) {
    return toast.error(
      "Your Job title  cannot be empty or less than two characters"
    );
  }
  if (companyName === "" || companyName.length < 2) {
    return toast.error(
      "Your company's name cannot be empty or less than two characters"
    );
  }

  if (category === "") {
    return toast.error("Please select a category");
  }

  if (exp === "") {
    return toast.error("Please select experience level");
  }

  if (description === "" || description.length < 10) {
    return toast.error(
      "A Job description cannot be empty or less than 10 characters"
    );
  }

  return true;
};
