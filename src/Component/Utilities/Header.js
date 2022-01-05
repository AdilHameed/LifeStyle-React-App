import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { authActions } from "../../Redux/Reducer/Auth";
import { searchActions } from "../../Redux/Reducer/Search";

const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const searchValue = useRef("");

  //user login checking
  const user = useSelector((state) => state.authReducer.isAuth);
  const user1 = JSON.parse(localStorage.getItem("profile"));
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
        <NavLink
          to="/products"
          style={{ color: "white", textDecoration: "none" }}
        >
          <Navbar.Brand style={{ fontSize: "25px" }}>Lifestyle</Navbar.Brand>{" "}
        </NavLink>
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
              <li
                className="nav-item nav-link"
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setShow(true)}
              >
                {user1.name.slice(0, 6) + " ..."}
              </li>
              <li className="nav-item nav-link">
                <NavLink
                  to="/cart"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <FaShoppingCart />
                  <small
                    style={{
                      color: "#dee3e2",
                    }}
                  >
                    {quantity >= 1 && quantity}
                  </small>
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
        {user && (
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
            <Modal.Header className="bg-secondary" closeButton>
              <span style={{ marginLeft: "80px" }} className="text-white">
                User's Profile
              </span>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  lineHeight: "1",
                }}
                className="text-white"
              >
                <p>Name : {user1.name}</p>
                <p>
                  Email : <small>{user1.username}</small>{" "}
                </p>
                <p>Address : {user1.address}</p>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
