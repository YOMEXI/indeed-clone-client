import styles from "./Card.module.css";

import parse from "html-react-parser";
import { Button, Card, Nav, Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";

export const SearchCard = ({ job }: any) => {
  const router = useRouter();
  let parsedDes = `${job.description.substring(0, 300)}.......
  `;

  //
  const showFullDetails = () => {
    router.push(`/job/${job.id}`, undefined, { shallow: true });
  };

  useEffect(() => {}, [router.query.id]);

  //
  return (
    <div>
      <Card className={styles.cardContainer} onClick={showFullDetails}>
        <Card.Header className={styles.cardHeaderTitle}>
          <Col> {job.jobtitle} </Col>
        </Card.Header>

        <Row className={styles.cardHeaderCompanyName}>
          <Col className={styles.cardHeaderCompanyName1}>
            {" "}
            {job.companyname}
          </Col>
          <Col className={styles.cardHeaderEye}>
            <FaEye onClick={() => router.push(`/job/${job.id}`)} />
          </Col>
        </Row>
        <Row>
          <Col className={styles.cardHeaderCompanyDesc}>
            {router.pathname === "/" || router.pathname === "/job/search"
              ? parse(parsedDes)
              : parsedDes}
          </Col>
        </Row>
        <Row>
          <Card.Text className="d-flex gap-2  flex-row">
            <Button
              variant="primary"
              size="sm"
              className={styles.cardHeaderCompanyButton}
            >
              Location: {job.location}
            </Button>
            <Button
              variant="primary"
              size="sm"
              className={styles.cardHeaderCompanyButton}
            >
              Experience: {job.exp}
            </Button>
          </Card.Text>
        </Row>
      </Card>
    </div>
  );
};

export default SearchCard;
