import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../Utilities/Wrapper";
const NotFound = () => {
  return (
    <Wrapper>
      <Row>
        <Col xs={12}>
          <h1 className="text-center">Page not found</h1>
        </Col>
      </Row>
    </Wrapper>
  );
};
export default NotFound;
