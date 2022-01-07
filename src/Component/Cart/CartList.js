import { Link } from "react-router-dom";
import Cart from "./Cart";
import Wrapper from "../Utilities/Wrapper";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../Redux/Reducer/Cart";

const CartList = () => {
  const dispatch = useDispatch();
  //getting cart data from reducer
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cartReducer
  );

  //getting user data from localStorage
  const userData = JSON.parse(localStorage.getItem("profile"));
  const handleOrder = () => {
    dispatch(cartActions.orderPlaced());
  };

  return (
    <Wrapper>
      <div className="row ms-1" style={{ minHeight: "100vh" }}>
        <div className="col-xs-12 col-sm-1 col-md-2 col-xl-3"></div>
        <div className="col-xs-12 col-sm-10 col-md-8 col-xl-6">
          <h2 className="mt-5">Cart</h2>
          <p className="item">{totalQuantity} ITEMS</p>
          {items.length > 0 ? (
            items.map((item) => <Cart key={item.id} item={item} />)
          ) : (
            <>
              <h4 className="ms-5">Hi {userData.name.split(" ")[0]}!</h4>
              <h3 className="text-center"> Your cart is empty</h3>
              <p className="text-center">
                You can go to home page to view more products
              </p>
            </>
          )}

          <hr />
          <div className="row">
            <div className="col-2 col-sm-2">
              <b className="pull-right">Subtotal</b>
            </div>
            <div className="col-6 col-sm-7 "></div>
            <div className="col-4 col-sm-3">
              <p>
                <b className="fw-bold ms-4">$</b>
                <b className="fw-bold "> {totalAmount.toFixed(2)}</b>
              </p>
              {items.length > 0 && (
                <Link
                  className="btn btn-primary btn-sm mt-2 mb-5 ms-1"
                  to="/order"
                  onClick={handleOrder}
                >
                  Place order
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-1 col-md-2 col-xl-3"></div>
      </div>
    </Wrapper>
  );
};

export default CartList;
