import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Wrapper from "../Utilities/Wrapper";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { cartActions } from "../../Redux/Reducer/Cart";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

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
  const handleAddRemoveItem = () => {
    if (quantity > 0) {
      dispatch(cartActions.addRemoveItem({ product, quantity }));
    }
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
          <Col xs={6}>
            <img src={product.image_link} height="500rem" width="500rem" />
          </Col>
          <Col xs={6}>
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
                  aria-label="Default select example"
                  size="md"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={currItem}
                >
                  <option value="0">
                    {quantity > 5 ? "Five+" : "Quantity"}
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                </Form.Select>
              </Col>
              <Col>
                {quantity > 0 ? (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleAddRemoveItem}
                    disabled={currItem}
                  >
                    {!currItem ? `Add To Cart` : `Added To Cart`}
                  </Button>
                ) : (
                  <Popup
                    trigger={
                      <Button variant="primary" type="button">
                        Add To Cart
                      </Button>
                    }
                    position="top right"
                  >
                    <div>Please select a quantity</div>
                  </Popup>
                )}
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
