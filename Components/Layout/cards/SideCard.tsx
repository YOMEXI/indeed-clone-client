import styles from "./Card.module.css";

import parse from "html-react-parser";
import { Button, Card, Col, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../redux/reduxHooks";

export const SideCard = () => {
  const router = useRouter();

  const { isLoading, user } = useAppSelector((state) => state.auth);
  //
  const [job, setjobs] = useState<any>("");
  const [loading, setLoading] = useState(false);

  let id = router.query.id;

  const allJobs = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/job/${id}`);
    setLoading(false);

    setjobs(data);
  };

  let alreadyApplied;
  if (job) {
    alreadyApplied = job.usersThatApplied.find(
      (job: any) => String(job.user) === String(user)
    );
  }

  useEffect(() => {
    if (id) {
      allJobs();
    }
  }, [router.query.id]);

  //
  return (
    <div>
      {job ? (
        <Container className={styles.HomeMainSideCard}>
          <Card className={styles.cardContainer}>
            <Col
              className={styles.cardHeaderTitle}
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "#808080",
              }}
            >
              <Col>{job?.jobtitle}</Col>
              <Col className={styles.cardHeaderCompanyName}>
                {job?.companyname}
              </Col>

              <Button className="my-3">{job?.location}</Button>
            </Col>

            <Col>
              <Col className={styles.cardHeaderCompanyDesc}>
                {parse(job?.description)}
              </Col>
              <Col className="d-flex gap-2">
                <Button
                  variant="primary"
                  className={styles.cardHeaderCompanyLoc}
                >
                  Location: {job?.location}
                </Button>
                <Button
                  variant="primary"
                  className={styles.cardHeaderCompanyExp}
                >
                  Experience: {job?.exp}
                </Button>
                <Button
                  variant="dark"
                  className={styles.cardHeaderCompanyExp}
                  onClick={() => router.push(`/job/apply/${job?.id}`)}
                >
                  {alreadyApplied ? "Applied Already " : "Apply"}
                </Button>
              </Col>
            </Col>
          </Card>
        </Container>
      ) : (
        <Col>
          <Card className="text-center">
            <Card.Header>View Job Details</Card.Header>
            <Card.Body>
              <Card.Title>Apply To Your Dream Job</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )}
    </div>
  );
};

export default SideCard;
