import axios from "axios";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const Pagination = ({ count, jobs, setJobs, location, keyword }: any) => {
  const [totalJobCount, settotalJobCount] = useState(0);

  const fetchPaginatedJobs = async (currentPage: number) => {
    const { data } = await axios.get(
      `/api/job?page=${currentPage}&count=${count}&location=${location}&keyword=${keyword}`
    );
    setJobs(data);
  };

  const totalCount = async () => {
    const { data } = await axios.get(`/api/job/count`);

    settotalJobCount(data);
  };

  useEffect(() => {
    totalCount();
  }, []);

  const handPageClick = async (data: any) => {
    let currentPage = data.selected;

    await fetchPaginatedJobs(currentPage);
  };
  return (
    <>
      <Col className="d-flex ">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={totalJobCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handPageClick}
          containerClassName={
            "pagination align-items-center justify-content-center"
          }
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-link"}
          nextLinkClassName={"page-item"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Col>
    </>
  );
};

export default Pagination;
