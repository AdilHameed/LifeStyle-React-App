import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../Redux/Reducer/Product";

const Pagination = () => {
  const dispatch = useDispatch();
  const { products, currentPage } = useSelector(
    (state) => state.productReducer
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(products.length / 8); i++) {
    pageNumbers.push(i);
  }
  const handlePagination = (event) => {
    const number = Number(event.target.textContent);

    dispatch(productActions.getProductByPage(number));
  };

  return (
    <div
      className="mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <nav>
        <Row>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <Col xs={2} sm={2}>
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : null
                  }`}
                >
                  <p onClick={handlePagination} className="page-link me-3">
                    {number}
                  </p>
                </li>
              </Col>
            ))}
          </ul>
        </Row>
      </nav>
    </div>
  );
};

export default Pagination;
