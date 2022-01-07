import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../StyleSheet/Common.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Row>
        <Col xs={12}>
          <p className=" text-center pt-2">
            Copyright © 2021 by Lifestyle Inc. All rights reserved.
          </p>
        </Col>
      </Row>
    </footer>
  );
};
export default Footer;
