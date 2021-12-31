import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";
import { cartActions } from "../../Redux/Reducer/Cart";
import { useDispatch } from "react-redux";

const Cart = (props) => {
  const dispatch = useDispatch();

  //functions dispatching for incrementing and decrementing item in the cart
  const decrementItemHandle = () => {
    dispatch(cartActions.decrementItem(props.item.id));
  };
  const incrementItemHandle = () => {
    dispatch(cartActions.incrementItem(props.item.id));
  };

  return (
    <div className="card mb-1" style={{ maxWidth: "540" }}>
      <div className="row no-gutters">
        <div className="col-md-3 mt-2">
          <img
            src={props.item.img}
            className="card-img"
            alt="..."
            height="90rem"
          />
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <p className="card-text">{props.item.name}</p>
          </div>
        </div>
        <div className="col-md-3 mt-4">
          <ButtonGroup size="sm">
            <Button
              variant="secondary"
              type="button"
              onClick={decrementItemHandle}
            >
              -
            </Button>
            <span className="ms-1 me-1 mt-1">{props.item.quantity}</span>
            <Button
              variant="success"
              type="button"
              onClick={incrementItemHandle}
            >
              +
            </Button>
          </ButtonGroup>
        </div>
        <div className="col-md-2 mt-4">${props.item.totalPrice.toFixed(2)}</div>
      </div>
    </div>
  );
};
export default Cart;
