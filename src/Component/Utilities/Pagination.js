import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../Redux/Reducer/Product";
import style from "../StyleSheet/Common.module.css";

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
    <div className={`${style.paginationDisplay} mt-5`}>
      <nav>
        <ul className="pagination">
          <Row className={`${style.paginationDisplay}`}>
            {pageNumbers.map((number) => (
              <Col xs={2} sm>
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : null
                  } `}
                >
                  <p onClick={handlePagination} className="page-link  ">
                    {number}
                  </p>
                </li>
              </Col>
            ))}
          </Row>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
