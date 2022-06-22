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
import SearchCard from "./cards/SearchCard";

const Search = () => {
  const router = useRouter();

  //

  const [jobs, setjobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(3);
  const [location, setlocation] = useState<any>(router.query.location);
  const [keyword, setkeyword] = useState<any>(router.query.keyword);

  const allJobs = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `/api/job/search?page=${page}&count=${count}&keyword=${keyword}&location=${location}`
    );
    setLoading(false);

    setjobs(data);
  };

  useEffect(() => {
    allJobs();
  }, [router.query.keyword, router.query.location]);

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
          <button className={styles.searchButton}>
            <a
              href={`/job/search?keyword=${keyword}&location=${location}`}
              className={styles.hrefs}
            >
              Submit
            </a>
          </button>
        </Col>
      </Row>

      <Row className={styles.HomeMainContainer}>
        <Col className={styles.HomeMainBox}>
          {loading && (
            <Col className="">
              <Loader />
            </Col>
          )}
          <Container className={styles.HomeMain}>
            {jobs?.map((job: jobTypes) => (
              <SearchCard job={job} key={job?.id} />
            ))}
            {jobs.length < 1 && <Col className="text-center">No more Jobs</Col>}
            <Col>
              <Pagination
                jobs={jobs}
                setJobs={setjobs}
                count={count}
                location={location}
                keyword={keyword}
              />
            </Col>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
