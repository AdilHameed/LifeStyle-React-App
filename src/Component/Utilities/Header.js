import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../Redux/Reducer/Auth";
import { searchActions } from "../../Redux/Reducer/Search";

const Header = () => {
  const dispatch = useDispatch();
  const searchValue = useRef("");

  //user login checking
  const user = useSelector((state) => state.authReducer.isAuth);
  //getting total cart quantity
  const quantity = useSelector((state) => state.cartReducer.totalQuantity);

  //search handle for products
  const handleSearch = () => {
    dispatch(searchActions.onSearch(searchValue.current.value));
  };
  //handle for logout
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
      <Container fluid="sm">
        <Navbar.Brand style={{ fontSize: "25px" }}>Lifestyle</Navbar.Brand>
        {user && (
          <>
            <Form className="d-flex">
              <Form.Control
                type="search"
                ref={searchValue}
                onChange={handleSearch}
                placeholder="Search products"
                className="me-2"
                style={{ width: "400px" }}
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
            <ul className="navbar-nav ">
              <li className="nav-item nav-link">
                <NavLink
                  to="/products"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item nav-link">
                <NavLink
                  to="/cart"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Cart
                  <code style={{ color: "#bd2aa5" }}>
                    {quantity >= 1 && quantity}
                  </code>
                </NavLink>
              </li>
              <li className="nav-item nav-link" onClick={handleLogout}>
                <NavLink
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
