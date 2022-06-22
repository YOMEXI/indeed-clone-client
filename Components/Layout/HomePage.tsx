import styles from "./HomePage.module.css";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

import { useState, useEffect } from "react";
import axios from "axios";
import { jobTypes } from "../Types/jobTypes";
import MainCard from "./cards/Card";
import SideCard from "./cards/SideCard";
import { Loader, OtherLoader } from "../utils/Loader";
import Pagination from "./cards/Pagination";
import { useRouter } from "next/router";
import SearchFilters from "../utils/searchFilters";
import { FaFilter } from "react-icons/fa";

const HomePage = () => {
  const router = useRouter();
  const [jobs, setjobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(3);
  const [location, setlocation] = useState("");
  const [keyword, setkeyword] = useState("");

  const allJobs = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/job?page=${page}&count=${count}`);
    setLoading(false);

    setjobs(data);
  };

  useEffect(() => {
    allJobs();
  }, []);

  //
  return (
    <Container>
      <Row className="my-5 d-flex justify-content-center align-items-center gap-2">
        <Col lg={5} md={5} sm={11} xs={11} className={styles.searchBox}>
          <label className={styles.searchLabel}>What</label>
          <input
            type="text"
            placeholder="job title,keywords"
            className={styles.searchInput}
            value={keyword}
            onChange={(e: any) => setkeyword(e.target.value)}
          />
        </Col>
        <Col lg={5} md={5} sm={11} xs={11} className={styles.searchBox}>
          <label className={styles.searchLabel}>Where</label>
          <input
            type="text"
            placeholder="City"
            className={styles.searchInput}
            value={location}
            onChange={(e: any) => setlocation(e.target.value)}
          />
        </Col>
        <Col>
          <button
            className={styles.searchButton}
            onClick={() =>
              router.push(`/job/search?keyword=${keyword}&location=${location}`)
            }
          >
            Submit
          </button>
        </Col>
      </Row>

      <Row>
        <Col className="my-1  d-flex">
          <a href="/job/filter">
            <FaFilter style={{ fontSize: "1.5rem" }} />
          </a>
        </Col>
      </Row>

      <Row className={styles.HomeMainContainer}>
        <Col className={styles.HomeMainBox}>
          {loading && <Loader />}
          <Container className={styles.HomeMain}>
            {jobs?.map((job: jobTypes) => (
              <MainCard job={job} key={job?.id} />
            ))}
            {jobs.length < 1 && (
              <Col className="text-center " style={{ height: "50vh" }}>
                No more Jobs
              </Col>
            )}
            <Col>
              <Pagination
                jobs={jobs}
                setJobs={setjobs}
                count={count}
                location={""}
                keyword={""}
              />
            </Col>
          </Container>
        </Col>
        <Col className={styles.HomeMainSideCard}>
          <SideCard />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
