import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productActions } from "../../Redux/Reducer/Product";
import { Rating } from "react-simple-star-rating";

const Product = (props) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  //dispatching getProductById
  const handleParams = () => {
    dispatch(productActions.getProductById(props.data.id));
  };

  return (
    <>
      <Card
        style={{ width: "17.7rem" }}
        className={hover && "shadow-lg"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Card.Img variant="top" src={props.data.image_link} height="250rem" />
        <Card.Body>
          <Card.Text>{props.data.name}</Card.Text>
          <p className="text-center text-muted">{props.data.product_type}</p>
          <p className="text-center">
            <Rating
              initialValue={props.data.rating}
              size="18"
              readonly="true"
              fillColor={props.data.rating > 3 ? "#0bb51c" : "#bf1111"}
            />
          </p>
          <p className="text-center">${props.data.price}</p>
          <div className="d-grid gap-2">
            <Link
              className="btn btn-outline-success btn-sm"
              to={`/products/${props.data.id}`}
              onClick={handleParams}
            >
              View
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
