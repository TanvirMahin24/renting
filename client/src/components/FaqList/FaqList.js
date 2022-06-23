import { Accordion } from "@mantine/core";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./FaqList.module.css";

import bg from "../../assets/icons/home.png";

const FaqList = () => {
  return (
    <Container>
      <Row>
        <Col md={6} className="py-5">
          <div className="border_left">
            <span className="d-block py-3 h3">Most asked questions</span>
          </div>
          <Accordion iconSize={40} multiple>
            <Accordion.Item label="What is our profit?">
              The main earning source for us is the sale of ad space on our
              website. We want to make sure that our users are happy with our
              service and we want to make sure that we are able to provide the
              best service to our users.
            </Accordion.Item>

            <Accordion.Item label="Why we focus on houses for the student?">
              In our country there are misconceptions about giving students a
              house for rent. This makes it hard for them to find a house for
              rent. So, we provide a platform for students to find a house for
              free.
            </Accordion.Item>

            <Accordion.Item label="What is the verification process?">
              Every user can request a house for booking. In the booking process
              a user will be asked to upload a picture of their NID / Student ID
              card. This picture will be visible to the owner and if and only if
              the owner accepts the request, the house will be booked.
            </Accordion.Item>

            <Accordion.Item label="Can anyone add listing?">
              Yes, every registered user can add a listing. For any mis leading
              information there is a "Report" button in every listing page. This
              would help us to manage the validity of the listings.
            </Accordion.Item>

            <Accordion.Item label="How to contact support?">
              There is a support team in our website. You can contact them by
              button on the sidebar of the dashboard. You can also contact us by
              email at{" "}
              <span className="text_primary">tanvirmahin24@gmail.com</span>.
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={6} className="pt-md-5 pt-0 pb-5 text-center">
          <img src={bg} alt="" className={`w-50 ${styles.img}`} />
        </Col>
      </Row>
    </Container>
  );
};

export default FaqList;
