import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Wrapper from "../Utilities/Wrapper";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Popup from "reactjs-popup";
import styles from "../StyleSheet/productDetail.module.css";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { cartActions } from "../../Redux/Reducer/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(false);

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
    setNotification(true);
  };

  //function for checking if product is added or not
  const currItem = useSelector((state) =>
    state.cartReducer.items.find((item) => item.id === product.id)
  );
  let notifyDetail = ``;
  useEffect(() => {
    if (currItem) {
      setQuantity(currItem.quantity);
      notifyDetail = `${currItem.quantity} x ${currItem.name} is added to cart`;
    }
    if (notification) {
      notify();
    }
  }, [currItem]);

  if (!product) {
    return (
      <Wrapper>
        <Container style={{ minHeight: "100vh" }}>
          <h1 className="text-center mt-5">No products found</h1>
        </Container>
      </Wrapper>
    );
  }
  const notify = () => toast(notifyDetail);
  return (
    <Wrapper>
      <Container style={{ minHeight: "100vh" }}>
        <Row>
          <Col xs={12} md={6} lg={6} xl={5}>
            <img
              src={product.image_link}
              className={styles.productDetailsImage}
            />
          </Col>
          <Col xs={12} md={6} lg={6} xl={7} className={styles.prodDetDisplay}>
            <h2 className="mb-5">{product.name}</h2>
            <Row>
              <Col xs={12} sm={6}>
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
              <Col xs={12} sm={5}>
                <h4 className="ms-2 fw-bold"> ${product.price}</h4>
              </Col>
              <Col xs={6} sm={3}>
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
                <ToastContainer />
              </Col>
            </Row>

            <p className="fs-10">
              <b>Description : </b>
              {product.description}
            </p>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ProductDetail;
