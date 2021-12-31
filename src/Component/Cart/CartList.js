import Cart from "./Cart";
import Wrapper from "../Utilities/Wrapper";
import { useSelector } from "react-redux";

const CartList = () => {
  //getting cart data from reducer
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cartReducer
  );

  //getting user data from localStorage
  const userData = JSON.parse(localStorage.getItem("profile"));

  return (
    <Wrapper>
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
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
            <div className="col-sm-4">
              <b className="pull-right">Subtotal</b>
            </div>
            <div className="col-sm-6"></div>
            <div className="col-sm-2">
              <p>
                <b className="fw-bold">$</b>
                <b className="fw-bold "> {totalAmount.toFixed(2)}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartList;
