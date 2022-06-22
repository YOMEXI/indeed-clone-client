import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { filterData, getFilterValues } from "./filterData";

export const SearchFilters = ({ setjobs, jobs }: any) => {
  const router = useRouter();

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
    allJobs();
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
    <Col
      className="d-flex justify-content-center align-items-center gap-2"
      lg={10}
      md={10}
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
  );
};

export default SearchFilters;
