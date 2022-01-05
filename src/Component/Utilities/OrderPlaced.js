import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const OrderPlaced = () => {
  return (
    <Wrapper>
      <Row>
        <Col xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "350px",
              lineHeight: "60px",
            }}
          >
            <h1>Your Order has been placed!</h1>
            <p>Go to home page to view more products</p>
            <Link className="btn btn-danger" to="/products">
              Home
            </Link>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};
export default OrderPlaced;
