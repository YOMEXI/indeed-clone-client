import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Form, Col, Row, Container, Pagination } from "react-bootstrap";
import MainCard from "../../Components/Layout/cards/Card";
import { jobTypes } from "../../Components/Types/jobTypes";
import { filterData, getFilterValues } from "../../Components/utils/filterData";

export const SearchFilters = () => {
  const router = useRouter();

  const [jobs, setjobs] = useState<any>([]);
  const [filters, setFilter] = useState(filterData);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(3);
  let location = router.query.location || "";
  let exp = router.query.exp || "";
  let category = router.query.category || "";

  const allJobs = async () => {
    const { data } = await axios.get(
      `/api/job/filter?page=${page}&count=${count}&location=${location}&exp=${exp}&category=${category}`
    );

    setjobs(data);
  };

  useEffect(() => {
    if (router.query) allJobs();
  }, [router.query]);

  const searchProperties = (filterValues: any) => {
    const path = router.pathname;

    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query: query });
  };

  return (
    <Row className="d-flex justify-content-center align-items-center gap-2 my-5">
      <Col
        lg={5}
        md={10}
        xs={8}
        sm={8}
        className="d-flex justify-content-center align-items-center gap-2 flex-wrap my-5"
      >
        {filters?.map((filter: any, i: any) => (
          <Form.Select
            placeholder={filter.Placeholder}
            onChange={(e: any) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            key={i}
          >
            {filter?.items?.map((item: any) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        ))}
      </Col>

      <Col lg={8} md={10} xs={11} sm={11}>
        {jobs &&
          jobs?.map((job: jobTypes) => <MainCard job={job} key={job?.id} />)}
        {jobs?.length < 1 && <Col className="text-center">No more Jobs</Col>}
        {/* {jobs && (
          <Col>
            <Pagination jobs={jobs} setJobs={setjobs} count={count} />
          </Col>
        )} */}
      </Col>
    </Row>
  );
};

export default SearchFilters;
