import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Wrapper from "../Utilities/Wrapper";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { cartActions } from "../../Redux/Reducer/Cart";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  let product = null;
  //extracting product id from params
  const { productId } = params;
  const prodId = Number(productId);

  //getting products and productdetail data from reducer
  const { products, productDetail } = useSelector(
    (state) => state.productReducer
  );

  //Another way to find productdetail by params id
  const productByParams = products.find((pro) => pro.id === prodId);

  if (productDetail) {
    product = productDetail;
  } else {
    product = productByParams;
  }

  //dispatching item id for remove or add item to cart
  const handleAddItem = () => {
    if (quantity > 0) {
      dispatch(cartActions.addItemToCart({ product, quantity }));
    }
    setShow(true);
  };

  //function for checking if product is added or not
  const currItem = useSelector((state) =>
    state.cartReducer.items.find((item) => item.id === product.id)
  );
  useEffect(() => {
    if (currItem) {
      setQuantity(currItem.quantity);
    }
  }, [currItem]);

  if (!product) {
    return (
      <Wrapper>
        <h1>No products found</h1>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col xs={12} sm={6}>
            <img src={product.image_link} height="500rem" width="500rem" />
          </Col>
          <Col xs={12} sm={6}>
            <h2 className="mb-5">{product.name}</h2>
            <Row>
              <Col xs={6}>
                <Rating
                  initialValue={product.rating}
                  size="25"
                  readonly="true"
                  fillColor={product.rating > 3 ? "#0bb51c" : "#bf1111"}
                />
                <span className="ms-1">{product.rating}</span>
              </Col>
              <Col>
                <p>product-type: {product.product_type}</p>
              </Col>
            </Row>

            <hr />
            <Row className="mt-4 mb-5">
              <Col xs={5}>
                <h4 className="ms-2 fw-bold"> ${product.price}</h4>
              </Col>
              <Col xs={3}>
                <Form.Select
                  size="md"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={currItem}
                >
                  <option value="1">{quantity > 10 ? quantity : "1"}</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Form.Select>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleAddItem}
                  disabled={currItem}
                >
                  {!currItem ? `Add To Cart` : `Added To Cart`}
                </Button>
              </Col>
            </Row>

            <p className="fs-10">
              <b>Description : </b>
              {product.description}
            </p>
          </Col>
        </Row>
        <Modal
          style={{
            position: "absolute",
            left: "31%",
          }}
          size="sm"
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <b style={{ marginLeft: "60px" }}>Item added to cart</b>
          </Modal.Header>
          <Modal.Body>
            <small className="text-center">
              {currItem &&
                `${currItem.quantity} x ${currItem.name} added to cart`}
            </small>
            <div className="text-center mt-2">
              <Link
                className="btn btn-dark btn-sm"
                to="/cart"
                onClick={() => setShow(true)}
              >
                View Cart
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </Wrapper>
  );
};

export default ProductDetail;
