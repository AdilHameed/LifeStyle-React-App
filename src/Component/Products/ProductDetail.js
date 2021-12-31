import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Wrapper from "../Utilities/Wrapper";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { cartActions } from "../../Redux/Reducer/Cart";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

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
    dispatch(cartActions.addRemoveItem(product));
  };

  //function for checking if product is added or not
  const isAdded = useSelector((state) =>
    state.cartReducer.items.some((item) => item.id === product.id)
  );

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
                />
                <span className="ms-1">{product.rating}</span>
              </Col>
              <Col>
                <p>product-type: {product.product_type}</p>
              </Col>
            </Row>

            <hr />
            <Row className="mt-4 mb-5">
              <Col xs={6}>
                <h4 className="ms-2 fw-bold"> ${product.price}</h4>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleAddRemoveItem}
                >
                  {!isAdded ? `Add To Cart` : `Added To Cart`}
                </Button>
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
